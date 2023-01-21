import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from './jwt.service';

/**
 * @description middleware는 한 app에만 설치할 수 있고 appModule에 등록해서 여러 곳에서 사용할 수 있다.
 */

//dependency injection를 사용해 JwtService를 의존성 주입 받는다.
@Injectable()
export class JwtMiddleWare implements NestMiddleware {
  //implements 는 extends와 다르게 interface를 구현한다는 의미이다.

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  // header에서 user를 request에 보내는 middleware 까지 만들었다.
  async use(req: Request, res: Response, nest: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];

      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.findById(decoded['id']);

          req['user'] = user; // req에 user를 추가해준다.
        }
      } catch (e) {}
    }
    nest(); // request 나 response를 해주고나서 nest()를 해줘야 다음 미들웨어로 넘어간다.
  }
}
