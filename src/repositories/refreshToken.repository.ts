import RefreshToken from "../models/RefreshToken";

/**
 * Creates a new refresh token for a user.
 *
 * @param {string} token - The refresh token string.
 * @param {number} userId - ID of the user associated with the token.
 * @param {Date} expiresAt - Expiration date of the token.
 * @returns {Promise<RefreshToken>} - The newly created refresh token instance.
 */
export const createRefreshToken = async (
    token: string,
    userId: number,
    expiresAt: Date
) => {
    return await RefreshToken.create({
        token,
        userId,
        expiresAt,
    });
};

/**
 * Finds a refresh token by its value.
 *
 * @param {string} token - The refresh token string.
 * @returns {Promise<RefreshToken | null>} - The refresh token if found, otherwise null.
 */
export const findRefreshToken = async (token: string) => {
    return await RefreshToken.findOne({
        where: { token },
    });
};

/**
 * Deletes a refresh token by its value.
 *
 * @param {string} token - The refresh token string.
 * @returns {Promise<number>} - The number of rows deleted (0 if not found).
 */
export const deleteRefreshToken = async (token: string) => {
    return await RefreshToken.destroy({
        where: { token },
    });
};
