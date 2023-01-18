import { DynamicModule } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interface';
export declare class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule;
}
