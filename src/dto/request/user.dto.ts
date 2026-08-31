export interface CreateUserDto{
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}