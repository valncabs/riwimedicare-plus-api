import { Request, Response } from "express";
import { seedDatabaseService } from "../services/seed.service";

/**
 * Controlador para manejar la siembra (seeding) de la base de datos mediante la carga de un archivo JSON.
 * 
 * @async
 * @function seedDatabase
 * @param {Request} req - Objeto de petición de Express. Se espera un archivo en `req.file` (procesado por Multer u otro middleware de carga).
 * @param {Response} res - Objeto de respuesta de Express para enviar el estado y los datos correspondientes.
 * @returns {Promise<Response>} Retorna una promesa que resuelve con la respuesta HTTP:
 * - **201 (Created):** Si el archivo JSON fue procesado e importado con éxito en la base de datos.
 * - **400 (Bad Request):** Si no se adjuntó ningún archivo en la petición o si ocurre un error durante el procesamiento.
 */
export const seedDatabase = async (
    req: Request,
    res: Response
) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "JSON file is required"
            });
        }

        const result = await seedDatabaseService(
            req.file.buffer
        );

        return res.status(201).json(result);

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            message: "Could not seed database"
        });

    }
};
