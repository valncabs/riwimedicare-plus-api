import { Request, Response } from "express";
import { CreateUserDto } from "../dto/request/user.dto";
import { createUserService ,getAllUsers, getUserById, updateUser as updateUserService} from "../services/user.service";
import { UserRepositoryImpl } from "../repositories/user.repository";
import * as userService from "../services/user.service";

export const getUsers = async ( req: Request, res: Response): Promise<void> => {
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

export const getUser = async ( req: Request, res: Response): Promise<void> => {
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


export const createUser = async (req: Request,res: Response): Promise<void> => {
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