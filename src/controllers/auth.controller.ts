import { Request, Response } from "express";

import {
    loginUser,
    refreshAccessToken,
    logoutUser
} from "../services/auth.service";

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.status(200).json(result);

    } catch {
        res.status(401).json({
            message: "Credenciales incorrectas"
        });
    }
};

export const refresh = async (req: Request, res: Response) => {

    try {

        const { refreshToken } = req.body;

        const result = await refreshAccessToken(refreshToken);

        res.status(200).json(result);

    } catch {

        res.status(401).json({
            message: "Refresh token inválido"
        });

    }
};

export const logout = async (req: Request, res: Response) => {

    try {

        const { refreshToken } = req.body;

        await logoutUser(refreshToken);

        res.status(200).json({
            message: "Logout correcto"
        });

    } catch {

        res.status(401).json({
            message: "Refresh token inválido"
        });

    }
};
