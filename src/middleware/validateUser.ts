import type { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate the request body when creating a new user.
 *
 * - Ensures that both `name` and `email` fields are provided.
 * - Validates that `name` is a string.
 * - Validates that `email` is a string.
 * - Returns a 400 error response if any validation fails.
 * - Calls `next()` to proceed if all validations pass.
 *
 * @param {Request} req - Express request object containing user data in the body.
 * @param {Response} res - Express response object used to send back validation errors.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {void} - Does not return a value; either sends an error response or calls `next()`.
 */
export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({
            message: "Nombre y email son obligatorios"
        });
        return;
    }
    if (typeof name !== "string") {
        res.status(400).json({
            message: "El nombre debe ser un texto"
        });
        return;
    }
    if (typeof email !== "string") {
        res.status(400).json({
            message: "El email debe ser un texto"
        });
        return;
    }
    next();
};