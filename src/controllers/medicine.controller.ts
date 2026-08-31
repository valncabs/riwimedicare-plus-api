import { Request, Response } from "express";
import {
    createMedicineService,
    getAllMedicinesService,
    getMedicineByIdService,
    updateMedicineService,
    deleteMedicineService
} from "../services/medicine.service";


/**
 * Creates a new medicine.
 *
 * @param {Request} req - Express request object containing medicine data in the body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the created medicine or an error message.
 */
export const createMedicine = async (req: Request, res: Response) => { 
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Medicine name is required"
            });
        }

        const medicine = await createMedicineService({
            name,
            description
        });

        return res.status(201).json(medicine);
    } catch {
        return res.status(400).json({
            message: "Could not create medicine"
        });
    }
};

/**
 * Retrieves all medicines.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with a list of medicines or an error message.
 */
export const getMedicines = async (req: Request, res: Response) => {
    try {
        const medicines = await getAllMedicinesService();

        return res.status(200).json(medicines);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve medicines"
        });
    }
};

/**
 * Retrieves a medicine by its ID.
 *
 * @param {Request} req - Express request object containing medicine ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the medicine data or an error message.
 */
export const getMedicine = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid medicine ID"
            });
        }

        const medicine = await getMedicineByIdService(id);

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        return res.status(200).json(medicine);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve medicine"
        });
    }
};

/**
 * Updates an existing medicine by its ID.
 *
 * @param {Request} req - Express request object containing medicine ID in params and updated data in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the updated medicine or an error message.
 */
export const updateMedicine = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, description, status } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid medicine ID"
            });
        }

        const medicine = await updateMedicineService(id, {
            name,
            description,
            status
        });

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        return res.status(200).json(medicine);
    } catch {
        return res.status(400).json({
            message: "Could not update medicine"
        });
    }
};

/**
 * Deletes (deactivates) a medicine by its ID.
 *
 * @param {Request} req - Express request object containing medicine ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response confirming deletion or an error message.
 */
export const deleteMedicine = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid medicine ID"
            });
        }

        const medicine = await deleteMedicineService(id);

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        return res.status(200).json({
            message: "Medicine deactivated successfully"
        });
    } catch {
        return res.status(500).json({
            message: "Could not deactivate medicine"
        });
    }
};