import bcrypt from "bcrypt";

/**
 * Hashes a plain text password.
 *
 * - Uses bcrypt with a salt factor of 10.
 * - Ensures passwords are stored securely in the database.
 *
 * @param {string} password - Plain text password.
 * @returns {Promise<string>} - Hashed password.
 */
export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
};

/**
 * Compares a plain text password with a hashed password.
 *
 * - Returns true if they match, false otherwise.
 * - Used during login to validate user credentials.
 *
 * @param {string} password - Plain text password provided by the user.
 * @param {string} hashedPassword - Stored hashed password from the database.
 * @returns {Promise<boolean>} - Comparison result.
 */
export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return bcrypt.compare(password, hashedPassword);
};
