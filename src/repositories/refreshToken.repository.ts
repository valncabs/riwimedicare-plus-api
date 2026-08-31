import RefreshToken from "../models/RefreshToken";

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

export const findRefreshToken = async (token: string) => {
    return await RefreshToken.findOne({
        where: { token },
    });
};

export const deleteRefreshToken = async (token: string) => {
    return await RefreshToken.destroy({
        where: { token },
    });
};