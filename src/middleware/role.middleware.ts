
import { Request, Response, NextFunction } from "express";
import Role from "../models/Role";

/**
 * Middleware that validates whether the authenticated user
 * has one of the allowed roles.
 */
export const roleMiddleware = (allowedRoles: string[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "Usuario no autenticado"
                });
            }

            const role = await Role.findByPk(req.user.roleId);

            if (!role || !allowedRoles.includes(role.name)) {
                return res.status(403).json({
                    message: "No tienes permisos para realizar esta acción"
                });
            }

            next();
        } catch {
            return res.status(500).json({
                message: "Error interno del servidor"
            });
        }
    };
};

