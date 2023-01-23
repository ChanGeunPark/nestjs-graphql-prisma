import { MailModuleOptions } from './mail.interface';
export declare class MailService {
    private readonly options;
    constructor(options: MailModuleOptions);
    private sendEmail;
    sendVerificationEmail(email: string, code: string): void;
}
