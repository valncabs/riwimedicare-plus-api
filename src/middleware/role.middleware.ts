import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRoles: number[]) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        if (!allowedRoles.includes(req.user.roleId)) {
            return res.status(403).json({
                message: "No tienes permisos para realizar esta acción"
            });
        }

        next();
    };
};