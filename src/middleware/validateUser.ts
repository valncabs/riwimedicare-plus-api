import type { Request, Response, NextFunction } from "express";

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