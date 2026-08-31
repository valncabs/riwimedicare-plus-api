
import { Request, Response, NextFunction } from "express";
import Role from "../models/Role";

/**
 * Middleware to validate whether the authenticated user
 * has one of the allowed roles.
 *
 * - Ensures that the user is authenticated (`req.user` exists).
 * - Retrieves the user's role from the database using `roleId`.
 * - Compares the role name against the list of allowed roles.
 * - Grants access if the role is permitted, otherwise denies with a 403 status.
 * - Handles unexpected errors with a 500 status.
 *
 * @param {string[]} allowedRoles - Array of role names permitted to access the route.
 * @returns {Function} - Express middleware function that validates user roles.
 *
 * @param {Request} req - Express request object containing authenticated user info.
 * @param {Response} res - Express response object used to send back error messages.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 */
export const roleMiddleware = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "User not authenticated"
                });
            }

            const role = await Role.findByPk(req.user.roleId);

            if (!role || !allowedRoles.includes(role.name)) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }

            next();
        } catch {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };
};

