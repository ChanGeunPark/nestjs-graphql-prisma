import { DynamicModule } from '@nestjs/common';
import { MailModuleOptions } from './mail.interface';
export declare class MailModule {
    static forRoot(options: MailModuleOptions): DynamicModule;
}
