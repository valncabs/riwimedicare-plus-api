/**
 * Data Transfer Object (DTO) for creating a new user.
 */
export interface CreateUserDto {
    /** Unique identifier for the user. */
    id: number;

    /** Full name of the user. */
    name: string;

    /** Email address of the user, used for login and communication. */
    email: string;

    /** Password for the user account (should be stored securely). */
    password: string;

    /** Identifier for the role assigned to the user (e.g., admin, client). */
    roleId: number;

    /** Indicates whether the user account is active (true) or inactive (false). */
    status: boolean;

    /** Date and time when the user account was created. */
    createdAt: Date;

    /** Date and time when the user account was last updated. */
    updatedAt: Date;
}
