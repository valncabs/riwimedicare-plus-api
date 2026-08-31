
import type { CreateUserDto } from "../dto/request/user.dto";
import User from "../models/User";
import type { UserRepository } from "./interfaces/user.repository.interface";


export class UserRepositoryImpl implements UserRepository {

    async createUser(user: CreateUserDto): Promise<User> {
        return User.create(user);
    }
}


export const findAllUsers = async () => {
    return await User.findAll({
        attributes: {
            exclude: ["password"]
        }
    });
};


export const findUserByEmail = async (email: string) => {
    return await User.findOne({
        where: {
            email: email
        }
    });
};


export const updateUserById = async (
    id: number,
    data: {
        name?: string;
        email?: string;
        password?: string;
        roleId?: number;
    }
) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.update(data);

    const updatedUser = user.toJSON();

    const userWithoutPassword = Object.fromEntries(
        Object.entries(updatedUser).filter(
            ([key]) => key !== "password"
        )
    );

    return userWithoutPassword;
};


export const findUserById = async (id: number) => {
    return await User.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });
};


export const deleteUserById = async (id: number) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    user.status = false;

    await user.save();

    return user;
};

