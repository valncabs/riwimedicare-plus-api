import type { Request, Response } from "express";
import * as warehouseService from "../services/warehouse.service";

export const createWarehouse = async (
    req: Request,
    res: Response
) => {
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

export const getWarehouses = async (
    req: Request,
    res: Response
) => {
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

export const getWarehouse = async (
    req: Request,
    res: Response
) => {
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

export const updateWarehouse = async (
    req: Request,
    res: Response
) => {
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

export const deleteWarehouse = async (
    req: Request,
    res: Response
) => {
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