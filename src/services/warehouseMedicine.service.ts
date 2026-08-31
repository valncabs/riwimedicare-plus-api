import {
    createWarehouseMedicine,
    findAllWarehouseMedicines,
    findWarehouseMedicineById,
    updateWarehouseMedicineById,
    deleteWarehouseMedicineById
} from "../repositories/warehouseMedicine.repository";

/**
 * Creates a new warehouse-medicine record.
 *
 * - Validates that stock is non-negative.
 * - Prevents duplicate entries for the same warehouse and medicine.
 *
 * @param {Object} data - Data required to create the record.
 * @returns {Promise<WarehouseMedicine>} - The newly created record.
 */
export const createWarehouseMedicineService = async (data: {
    warehouseId: number;
    medicineId: number;
    stock: number;
}) => {
    if (data.stock < 0) {
        throw new Error("Stock cannot be negative");
    }

    const existing = await findWarehouseMedicineById(
        data.warehouseId,
        data.medicineId
    );

    if (existing) {
        throw new Error("This medicine is already registered in the warehouse");
    }

    return await createWarehouseMedicine(data);
};

/**
 * Returns all medicines stored in a specific warehouse.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @returns {Promise<WarehouseMedicine[]>} - Array of records.
 */
export const getAllWarehouseMedicinesService = async (
    warehouseId: number
) => {
    return await findAllWarehouseMedicines(warehouseId);
};

/**
 * Returns a specific medicine in a warehouse.
 *
 * - Throws an error if not found.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @param {number} medicineId - Medicine identifier.
 * @returns {Promise<WarehouseMedicine>} - The record if found.
 */
export const getWarehouseMedicineByIdService = async (
    warehouseId: number,
    medicineId: number
) => {
    const record = await findWarehouseMedicineById(warehouseId, medicineId);

    if (!record) {
        throw new Error("Medicine not found in warehouse");
    }

    return record;
};

/**
 * Updates the stock of a medicine in a warehouse.
 *
 * - Validates existence before updating.
 * - Ensures stock is non-negative.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @param {number} medicineId - Medicine identifier.
 * @param {Object} data - Partial data to update.
 * @returns {Promise<WarehouseMedicine>} - The updated record.
 */
export const updateWarehouseMedicineService = async (
    warehouseId: number,
    medicineId: number,
    data: {
        stock?: number;
    }
) => {
    const record = await findWarehouseMedicineById(warehouseId, medicineId);

    if (!record) {
        throw new Error("Medicine not found in warehouse");
    }

    if (data.stock !== undefined && data.stock < 0) {
        throw new Error("Stock cannot be negative");
    }

    return await updateWarehouseMedicineById(warehouseId, medicineId, data);
};

/**
 * Deletes a warehouse-medicine record permanently.
 *
 * - Throws an error if not found.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @param {number} medicineId - Medicine identifier.
 * @returns {Promise<WarehouseMedicine>} - The deleted record.
 */
export const deleteWarehouseMedicineService = async (
    warehouseId: number,
    medicineId: number
) => {
    const record = await deleteWarehouseMedicineById(warehouseId, medicineId);

    if (!record) {
        throw new Error("Medicine not found in warehouse");
    }

    return record;
};
