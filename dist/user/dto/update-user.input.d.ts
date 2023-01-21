import { CreateUserInput } from './create-user.input';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const UpdateUserInput_base: import("@nestjs/common").Type<Partial<CreateUserInput>>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    id: number;
}
export declare class UpdateUserOutput extends CoreOutput {
}
export {};
