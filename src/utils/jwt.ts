import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h"
        }
    );
};

export const generateRefreshToken = (userId: number) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET as string,
        {
            expiresIn: "7d"
        }
    );
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    );
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
    );
};