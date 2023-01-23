import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import * as Joi from 'joi';
import { JwtMiddleWare } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',

      // 서버에 deploy 할 때는 .env 파일을 사용하지 않는다.
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        // 환경변수 유효성 검사
        DATABASE_URL: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAIL_API_KEY: Joi.string().required(),
        MAIL_DOMAIN_NAME: Joi.string().required(),
        MAIL_FROM_EMAIL: Joi.string().required(),
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // apollo server plugin -> ui를 제공해준다.

      /**
       * @description context는 어떤 resolver에서든 접근할 수 있다.
       *  jwt를 통해 user를 얻어서 context에 넣어준다.
       */
      context: ({ req }) => ({ user: req['user'] }),
    }),

    // 모듈을 dynamic 하게 import 할 수 있게 변경
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    UserModule,
    MailModule.forRoot({
      apiKey: process.env.MAIL_API_KEY,
      domain: process.env.MAIL_DOMAIN_NAME,
      fromEmail: process.env.MAIL_FROM_EMAIL,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JwtMiddleWare).forRoutes('graphql'); // 이렇게 하면 graphql로 시작하는 모든 경로에 적용된다.
    // nestjs에서는 어떤 Route에 middleware를 적용할지 정할 수 있다.
    consumer.apply(JwtMiddleWare).forRoutes({
      path: '/graphql',
      // path: '*',
      method: RequestMethod.POST,
    });

    // exclude를 사용하면 해당 경로는 middleware를 적용하지 않는다.
    // consumer.apply().exclude({
    //   path: '/api',
    //   method: RequestMethod.ALL,
    // });
  }
  //middle ware는 main.ts에서 적용할 수도 있다.
}
