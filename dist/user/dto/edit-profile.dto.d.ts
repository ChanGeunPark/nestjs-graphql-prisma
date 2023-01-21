import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateUserInput } from './create-user.input';
export declare class EditProfileOutput extends CoreOutput {
}
declare const EditProfileInput_base: import("@nestjs/common").Type<Partial<CreateUserInput>>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export {};
