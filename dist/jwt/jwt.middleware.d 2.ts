import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from './jwt.service';
export declare class JwtMiddleWare implements NestMiddleware {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    use(req: Request, res: Response, nest: NextFunction): Promise<void>;
}
