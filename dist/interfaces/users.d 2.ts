export type UserRole = 'Client' | 'Owner' | 'Delivery';
export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    updatedAt: Date;
    createdAt: Date;
}
