import type { Request, Response } from "express";
import * as warehouseService from "../services/warehouse.service";

/**
 * Creates a new warehouse.
 *
 * @param {Request} req - Express request object containing warehouse data in the body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the created warehouse or an error message.
 */
export const createWarehouse = async (req: Request, res: Response) => {
    try {
        const warehouse = await warehouseService.createWarehouseService(
            req.body
        );

        return res.status(201).json({
            message: "Warehouse created successfully",
            warehouse
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error creating warehouse"
        });
    }
};

/**
 * Retrieves all warehouses.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with a list of warehouses or an error message.
 */
export const getWarehouses = async (req: Request, res: Response) => {
    try {
        const warehouses =
            await warehouseService.getAllWarehousesService();

        return res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error retrieving warehouses"
        });
    }
};

/**
 * Retrieves a warehouse by its ID.
 *
 * @param {Request} req - Express request object containing warehouse ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the warehouse data or an error message.
 */
export const getWarehouse = async (req: Request, res: Response) => { 
    try {
        const id = Number(req.params.id);

        const warehouse =
            await warehouseService.getWarehouseByIdService(id);

        if (!warehouse) {
            return res.status(404).json({
                message: "Warehouse not found"
            });
        }

        return res.status(200).json(warehouse);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error retrieving warehouse"
        });
    }
};

/**
 * Updates an existing warehouse by its ID.
 *
 * @param {Request} req - Express request object containing warehouse ID in params and updated data in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the updated warehouse or an error message.
 */
export const updateWarehouse = async (req: Request, res: Response) => { 
    try {
        const id = Number(req.params.id);

        const warehouse =
            await warehouseService.updateWarehouseService(
                id,
                req.body
            );

        if (!warehouse) {
            return res.status(404).json({
                message: "Warehouse not found"
            });
        }

        return res.status(200).json({
            message: "Warehouse updated successfully",
            warehouse
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error updating warehouse"
        });
    }
};

/**
 * Deletes a warehouse by its ID.
 *
 * @param {Request} req - Express request object containing warehouse ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response confirming deletion or an error message.
 */
export const deleteWarehouse = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const warehouse =
            await warehouseService.deleteWarehouseService(id);

        if (!warehouse) {
            return res.status(404).json({
                message: "Warehouse not found"
            });
        }

        return res.status(200).json({
            message: "Warehouse deleted successfully"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error deleting warehouse"
        });
    }
};