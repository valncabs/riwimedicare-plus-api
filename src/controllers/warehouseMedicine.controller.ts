
import { Request, Response } from "express";
import {
    createWarehouseMedicineService,
    getAllWarehouseMedicinesService,
    updateWarehouseMedicineService,
    deleteWarehouseMedicineService
} from "../services/warehouseMedicine.service";


/**
 * Creates a new warehouse-medicine association with stock information.
 *
 * @param {Request} req - Express request object containing warehouseId in params and medicineId, stock in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the created warehouse-medicine record or an error message.
 */
export const createWarehouseMedicine = async (req: Request, res: Response) => {
    try {
        const warehouseId = Number(req.params.warehouseId);
        const medicineId = Number(req.body.medicineId);
        const { stock } = req.body;

        if (
            isNaN(warehouseId) ||
            isNaN(medicineId) ||
            stock === undefined
        ) {
            return res.status(400).json({
                message: "Invalid warehouse medicine data"
            });
        }

        const warehouseMedicine =
            await createWarehouseMedicineService({
                warehouseId,
                medicineId,
                stock
            });

        return res.status(201).json(warehouseMedicine);
    } catch {
        return res.status(400).json({
            message: "Could not add medicine to warehouse"
        });
    }
};


/**
 * Retrieves all medicines stored in a specific warehouse.
 *
 * @param {Request} req - Express request object containing warehouseId in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with medicines in the warehouse or an error message.
 */
export const getWarehouseMedicines = async (req: Request, res: Response) => {
    try {
        const warehouseId = Number(req.params.warehouseId);

        if (isNaN(warehouseId)) {
            return res.status(400).json({
                message: "Invalid warehouse ID"
            });
        }

        const medicines =
            await getAllWarehouseMedicinesService(warehouseId);

        return res.status(200).json(medicines);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve warehouse medicines"
        });
    }
};

/**
 * Updates the stock of a specific medicine in a warehouse.
 *
 * @param {Request} req - Express request object containing warehouseId and medicineId in params, and stock in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the updated warehouse-medicine record or an error message.
 */
export const updateWarehouseMedicine = async (req: Request, res: Response) => {
    try {
        const warehouseId = Number(req.params.warehouseId);
        const medicineId = Number(req.params.medicineId);
        const { stock } = req.body;

        if (
            isNaN(warehouseId) ||
            isNaN(medicineId) ||
            stock === undefined
        ) {
            return res.status(400).json({
                message: "Invalid warehouse medicine data"
            });
        }

        const warehouseMedicine =
            await updateWarehouseMedicineService(
                warehouseId,
                medicineId,
                { stock }
            );

        if (!warehouseMedicine) {
            return res.status(404).json({
                message: "Medicine not found in warehouse"
            });
        }

        return res.status(200).json(warehouseMedicine);
    } catch {
        return res.status(400).json({
            message: "Could not update warehouse medicine"
        });
    }
};

/**
 * Deletes a medicine from a warehouse.
 *
 * @param {Request} req - Express request object containing warehouseId and medicineId in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response confirming deletion or an error message.
 */
export const deleteWarehouseMedicine = async (req: Request, res: Response) => {
    try {
        const warehouseId = Number(req.params.warehouseId);
        const medicineId = Number(req.params.medicineId);

        if (
            isNaN(warehouseId) ||
            isNaN(medicineId)
        ) {
            return res.status(400).json({
                message: "Invalid ID"
            });
        }

        const warehouseMedicine =
            await deleteWarehouseMedicineService(
                warehouseId,
                medicineId
            );

        if (!warehouseMedicine) {
            return res.status(404).json({
                message: "Medicine not found in warehouse"
            });
        }

        return res.status(200).json({
            message: "Medicine removed from warehouse successfully"
        });
    } catch {
        return res.status(500).json({
            message: "Could not remove medicine from warehouse"
        });
    }
};

