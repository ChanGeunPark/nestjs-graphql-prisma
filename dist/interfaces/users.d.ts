export type UserRole = 'Client' | 'Owner' | 'Delivery';
export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    verified?: boolean;
    updatedAt: Date;
    createdAt: Date;
}
export interface Verification {
    id: number;
    code: string;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
}
