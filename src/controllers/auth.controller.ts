import { Request, Response } from "express";

import {
    loginUser,
    refreshAccessToken,
    logoutUser
} from "../services/auth.service";

/**
 * Handles user login request.
 * Extracts email and password from the request body,
 * calls the loginUser service, and returns the authentication result.
 * If authentication fails, responds with a 401 status and error message.
 *
 * @param {Request} req - Express request object containing email and password.
 * @param {Response} res - Express response object used to send back the result.
 */
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

/**
 * Handles refresh token request.
 * Extracts the refresh token from the request body,
 * calls the refreshAccessToken service, and returns a new access token.
 * If the refresh token is invalid, responds with a 401 status and error message.
 *
 * @param {Request} req - Express request object containing the refresh token.
 * @param {Response} res - Express response object used to send back the result.
 */
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

/**
 * Handles user logout request.
 * Extracts the refresh token from the request body,
 * calls the logoutUser service to invalidate the token,
 * and responds with a success message.
 * If the refresh token is invalid, responds with a 401 status and error message.
 *
 * @param {Request} req - Express request object containing the refresh token.
 * @param {Response} res - Express response object used to send back the result.
 */
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
