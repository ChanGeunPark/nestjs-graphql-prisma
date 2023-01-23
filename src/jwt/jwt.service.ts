import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interface';

import { ConfigService } from '@nestjs/config';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions, // private readonly configService: ConfigService,
  ) {}

  sign(userId: number): string {
    /*
    return jwt.sign (payload, this.configService.get('PRIVATE_KEY')); //이런식으로 global config를 가져올 수 있다.
     */
    return jwt.sign({ id: userId }, this.options.privateKey);
  }

  // token을 받아서 verify (검증) 한다.
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
