import { CoreEntity } from 'src/common/entities/core.entity';
export declare enum UserRole {
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery"
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    verified?: boolean;
    role: 'Client' | 'Owner' | 'Delivery';
}
