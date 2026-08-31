
import { Request, Response } from "express";
import {
    createWarehouseMedicineService,
    getAllWarehouseMedicinesService,
    updateWarehouseMedicineService,
    deleteWarehouseMedicineService
} from "../services/warehouseMedicine.service";

export const createWarehouseMedicine = async (
    req: Request,
    res: Response
) => {
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

export const getWarehouseMedicines = async (
    req: Request,
    res: Response
) => {
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

export const updateWarehouseMedicine = async (
    req: Request,
    res: Response
) => {
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

export const deleteWarehouseMedicine = async (
    req: Request,
    res: Response
) => {
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

