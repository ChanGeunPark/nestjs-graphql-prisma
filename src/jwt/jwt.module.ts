import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './jwt.interface';

import { JwtService } from './jwt.service';

@Module({})
@Global() // Global 모듈은 다른 모듈에서 import 할 수 있다.
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      // provider: [JwtService],
      // 위와 같이 JwtService를 풀어서 쓰는 것과 같다.
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
    };
  }
}
