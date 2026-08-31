import { findUserByEmail } from "../repositories/user.repository";
import RefreshToken from "../models/RefreshToken";
import { comparePassword} from "../utils/password";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt";

import {
    deleteRefreshToken,
    findRefreshToken
} from "../repositories/refreshToken.repository";


export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (!user.status) {
        throw new Error("Usuario inactivo");
    }

    const passwordCorrecta = await comparePassword(
        password,
        user.password
    );

    if (!passwordCorrecta) {
        throw new Error("Contraseña incorrecta");
    }

    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        roleId: user.roleId,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(user.id);

    await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
    });

    return {
        message: "Login correcto",
        accessToken,
        refreshToken,
    };
};


export const refreshAccessToken = async (refreshToken: string) => {
    const tokenData = await findRefreshToken(refreshToken);

    if (!tokenData) {
        throw new Error("Refresh token inválido");
    }

    if (new Date() > tokenData.expiresAt) {
        await deleteRefreshToken(refreshToken);
        throw new Error("Refresh token expirado");
    }

    try {
        const decoded = verifyRefreshToken(refreshToken) as {
            id: number;
        };

        const accessToken = generateAccessToken({
            id: decoded.id
        });

        return {
            accessToken
        };

    } catch {
        throw new Error("Refresh token inválido");
    }
};


export const logoutUser = async (refreshToken: string) => {
    const tokenData = await findRefreshToken(refreshToken);

    if (!tokenData) {
        throw new Error("Refresh token inválido");
    }

    await deleteRefreshToken(refreshToken);

    return {
        message: "Logout correcto"
    };
};