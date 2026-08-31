import type { CreateUserDto } from "../dto/request/user.dto";
import User from "../models/User";
import type { UserRepository } from "./interfaces/user.repository.interface";

/**
 * Concrete implementation of the UserRepository interface.
 *
 * - Provides persistence operations for the User entity.
 * - Uses Sequelize ORM to interact with the database.
 */
export class UserRepositoryImpl implements UserRepository {
    /**
     * Creates a new user in the database.
     *
     * @param {CreateUserDto} user - Data Transfer Object containing user details.
     * @returns {Promise<User>} - A promise that resolves to the created User instance.
     */
    async createUser(user: CreateUserDto): Promise<User> {
        return User.create(user);
    }
}

/**
 * Returns all users excluding their passwords.
 *
 * @returns {Promise<User[]>} - Array of users without password field.
 */
export const findAllUsers = async () => {
    return await User.findAll({
        attributes: {
            exclude: ["password"]
        }
    });
};

/**
 * Finds a user by email.
 *
 * @param {string} email - User's email address.
 * @returns {Promise<User | null>} - The user if found, otherwise null.
 */
export const findUserByEmail = async (email: string) => {
    return await User.findOne({
        where: {
            email: email
        }
    });
};

/**
 * Updates a user by ID.
 *
 * @param {number} id - User identifier.
 * @param {Object} data - Partial data to update.
 * @param {string} [data.name] - Updated name.
 * @param {string} [data.email] - Updated email.
 * @param {string} [data.password] - Updated password.
 * @param {number} [data.roleId] - Updated role ID.
 * @returns {Promise<Partial<User> | null>} - The updated user without password if found, otherwise null.
 */
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

/**
 * Finds a user by ID excluding the password.
 *
 * @param {number} id - User identifier.
 * @returns {Promise<User | null>} - The user if found, otherwise null.
 */
export const findUserById = async (id: number) => {
    return await User.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });
};

/**
 * Deactivates a user instead of deleting permanently (soft delete).
 *
 * @param {number} id - User identifier.
 * @returns {Promise<User | null>} - The deactivated user if found, otherwise null.
 */
export const deleteUserById = async (id: number) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    user.status = false;

    await user.save();

    return user;
};
