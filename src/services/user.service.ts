import type { CreateUserDto } from "../dto/request/user.dto";
import User from "../models/User";
import type { UserRepository } from "../repositories/interfaces/user.repository.interface";
import bcrypt from "bcrypt";
import {
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
} from "../repositories/user.repository";

/**
 * Returns all active users excluding sensitive fields.
 *
 * @returns {Promise<User[]>} - Array of users.
 */
export const getAllUsers = async () => {
    return await findAllUsers();
};

/**
 * Returns a user by ID.
 *
 * - Throws an error if not found.
 *
 * @param {number} id - User identifier.
 * @returns {Promise<User>} - The user instance if found.
 */
export const getUserById = async (id: number) => {
    const user = await findUserById(id);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user;
};

/**
 * Creates a new user.
 *
 * - Hashes the password before saving.
 * - Ensures email uniqueness (optional improvement).
 *
 * @param {CreateUserDto} user - Data Transfer Object containing user details.
 * @param {UserRepository} repository - Repository implementation.
 * @returns {Promise<User>} - The newly created user instance.
 */
export const createUserService = async (
    user: CreateUserDto,
    repository: UserRepository
): Promise<User> => {
    if (!user.password) {
        throw new Error("La contraseña es obligatoria");
    }

    // Hash password with salt rounds = 10
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword = {
        ...user,
        password: hashedPassword
    };

    return repository.createUser(userWithHashedPassword);
};

/**
 * Updates an existing user.
 *
 * - Validates existence before updating.
 * - Hashes password if provided.
 *
 * @param {number} id - User identifier.
 * @param {Object} data - Partial data to update.
 * @returns {Promise<Partial<User>>} - The updated user without password.
 */
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

/**
 * Deactivates a user (soft delete).
 *
 * - Throws an error if not found.
 *
 * @param {number} id - User identifier.
 * @returns {Promise<User>} - The deactivated user instance.
 */
export const deleteUser = async (id: number) => {
    const user = await deleteUserById(id);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user;
};
