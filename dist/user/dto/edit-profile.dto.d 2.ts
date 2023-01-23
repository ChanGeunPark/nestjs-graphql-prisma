import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
declare const EditProfileInput_base: import("@nestjs/common").Type<Partial<Pick<User, keyof User>>>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export declare class EditProfileOutput extends CoreOutput {
}
export {};
