import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //이런식으로 schema 를 직접 만들어줄 수도 있다.
    }),
    TodoModule, //forRoot() 는 GraphQLModule 의 설정을 할 수 있는 메소드이다.
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
