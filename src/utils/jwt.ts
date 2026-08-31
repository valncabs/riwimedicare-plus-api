import jwt from "jsonwebtoken";

/**
 * Generates a short-lived access token.
 *
 * - Encodes the provided payload (user data).
 * - Uses the secret key defined in environment variables.
 * - Expires in 1 hour.
 *
 * @param {object} payload - User data to encode in the token.
 * @returns {string} - Signed JWT access token.
 */
export const generateAccessToken = (payload: object) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );
};

/**
 * Generates a long-lived refresh token.
 *
 * - Encodes only the user ID.
 * - Uses a separate secret key for refresh tokens.
 * - Expires in 7 days.
 *
 * @param {number} userId - User identifier.
 * @returns {string} - Signed JWT refresh token.
 */
export const generateRefreshToken = (userId: number) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" }
    );
};

/**
 * Verifies the validity of an access token.
 *
 * - Throws an error if the token is invalid or expired.
 *
 * @param {string} token - JWT access token.
 * @returns {object | string} - Decoded payload if valid.
 */
export const verifyAccessToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    );
};

/**
 * Verifies the validity of a refresh token.
 *
 * - Throws an error if the token is invalid or expired.
 *
 * @param {string} token - JWT refresh token.
 * @returns {object | string} - Decoded payload if valid.
 */
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
    );
};
