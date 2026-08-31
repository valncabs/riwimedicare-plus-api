import { Request, Response } from "express";
import { CreateUserDto } from "../dto/request/user.dto";
import { createUserService ,getAllUsers, getUserById, updateUser as updateUserService} from "../services/user.service";
import { UserRepositoryImpl } from "../repositories/user.repository";
import * as userService from "../services/user.service";

/**
 * Retrieves all users from the system.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<void>} - Returns a JSON response with all users or an error message.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => { 
    try {
        const users = await getAllUsers();
        res.status(200).json({
            users
        });
    } catch (error) {
        console.error("ERROR AL OBTENER USUARIOS:", error);
        res.status(500).json({
            message: "Error al obtener usuarios"
        });
    }
};

/**
 * Retrieves a user by their ID.
 *
 * @param {Request} req - Express request object containing user ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<void>} - Returns a JSON response with the user data or an error message.
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const user = await getUserById(id);
        res.status(200).json({
            user
        });
    } catch (error) {
        console.error("ERROR AL OBTENER USUARIO:", error);
        res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
};


/**
 * Creates a new user.
 *
 * @param {Request} req - Express request object containing user data in the body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<void>} - Returns a JSON response with the created user or an error message.
 */
export const createUser = async (req: Request, res: Response): Promise<void> => { 
    try {
        const user: CreateUserDto = req.body;
        const repository = new UserRepositoryImpl();
        const result = await createUserService(user, repository);
        res.status(201).json({
            message: "Usuario creado correctamente",
            user: result
        });
    } catch (error) {
        console.error("ERROR AL CREAR USUARIO:", error);
        res.status(500).json({
            message: "Error al crear usuario"
        });
    }
};

/**
 * Updates an existing user by their ID.
 *
 * @param {Request} req - Express request object containing user ID in params and updated data in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<void>} - Returns a JSON response with the updated user or an error message.
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const user = await updateUserService(id, req.body);
        res.status(200).json({
            message: "Usuario actualizado correctamente",
            user
        });
    } catch (error) {
        console.error("ERROR AL ACTUALIZAR USUARIO:", error);
        res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
};

/**
 * Deletes a user by their ID.
 *
 * @param {Request} req - Express request object containing user ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response confirming deletion or an error message.
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await userService.deleteUser(id);
        res.status(200).json({
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        console.error("ERROR AL ELIMINAR USUARIO:", error);
        res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
};