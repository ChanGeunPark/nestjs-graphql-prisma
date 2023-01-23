import { JwtModuleOptions } from './jwt.interface';
export declare class JwtService {
    private readonly options;
    constructor(options: JwtModuleOptions);
    sign(userId: object): string;
    verify(token: string): any;
}
