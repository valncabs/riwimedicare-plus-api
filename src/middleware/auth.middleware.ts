import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/express";

/**
 * Middleware to authenticate requests using JWT.
 * 
 * - Checks for the presence of an Authorization header.
 * - Extracts and verifies the JWT token using the secret key.
 * - Attaches the decoded payload to `req.user` if valid.
 * - Rejects the request with a 401 status if the token is missing or invalid.
 *
 * @param {Request} req - Express request object containing headers with the JWT token.
 * @param {Response} res - Express response object used to send back authentication errors.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Response | void} - Returns a 401 error response if authentication fails, otherwise calls `next()`.
 */
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token requerido"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token requerido"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as AuthPayload;

        req.user = decoded;

        console.log("Usuario autenticado:", req.user);

        next();

    } catch{

        return res.status(401).json({
            message: "Token inválido"
        });
    }
};