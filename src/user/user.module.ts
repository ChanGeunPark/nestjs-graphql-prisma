import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UserResolver, UserService, PrismaService, ConfigService],
  exports: [UserService], // 다른 모듈에서 UserService를 사용할 수 있게 한다. @injectable()
})
export class UserModule {}
