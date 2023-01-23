import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
export declare class UserProfileInput {
    userId: number;
}
export declare class UserProfileOutput extends CoreOutput {
    user?: User;
}
