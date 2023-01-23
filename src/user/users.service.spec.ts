import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(UserService);
    prisma = module.get(PrismaService);

    // prisma = module.get<PrismaService>(PrismaService);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    // service가 정의되어있는지 확인한다.
    expect(service).toBeDefined();
  });

  it.todo('createUser');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
