import type { CreateUserDto } from "../dto//request/user.dto";
import User from "../models/User";
import type { UserRepository } from "../repositories/interfaces/user.repository.interface";
import bcrypt from 'bcrypt'
import { findAllUsers, findUserById, updateUserById, deleteUserById } from "../repositories/user.repository";


export const getAllUsers = async () => {
    return await findAllUsers();
};


export const getUserById = async (id: number) => {
    const user = await findUserById(id);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user;
};
export const createUserService = async (user: CreateUserDto, repository: UserRepository): Promise<User> => {
    //hash (10, salt)
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = {
        ...user,
        password: hashedPassword
    };

    return repository.createUser(userWithHashedPassword);
};

export const updateUser = async (
    id: number,
    data: {
        name?: string;
        email?: string;
        password?: string;
        roleId?: number;
    }
) => {

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await updateUserById(id, data);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user;
};

export const deleteUser = async (id: number) => {
    const user = await deleteUserById(id);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user;
};