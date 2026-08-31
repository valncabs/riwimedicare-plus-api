import type { CreateUserDto } from "../../dto/request/user.dto";
import { User } from "../../models";

/**
 * Repository interface for User entity.
 *
 * - Defines the contract for user-related persistence operations.
 * - Ensures that any implementation of this interface provides
 *   a method to create a new user in the system.
 *
 * @interface UserRepository
 */
export interface UserRepository {
    /**
     * Creates a new user in the database.
     *
     * @param {CreateUserDto} user - Data Transfer Object containing user details.
     * @returns {Promise<User>} - A promise that resolves to the created User instance.
     */
    createUser(user: CreateUserDto): Promise<User>;
}
