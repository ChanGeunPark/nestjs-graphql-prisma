import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
declare const CreateUserInput_base: import("@nestjs/common").Type<Pick<User, "password" | "email" | "role">>;
export declare class CreateUserInput extends CreateUserInput_base {
}
export declare class CreateUserOutput extends CoreOutput {
}
export {};
