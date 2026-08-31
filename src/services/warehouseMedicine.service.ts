
import {
    createWarehouseMedicine,
    findAllWarehouseMedicines,
    findWarehouseMedicineById,
    updateWarehouseMedicineById,
    deleteWarehouseMedicineById
} from "../repositories/warehouseMedicine.repository";

export const createWarehouseMedicineService = async (data: {
    warehouseId: number;
    medicineId: number;
    stock: number;
}) => {
    return await createWarehouseMedicine(data);
};

export const getAllWarehouseMedicinesService = async (
    warehouseId: number
) => {
    return await findAllWarehouseMedicines(warehouseId);
};

export const getWarehouseMedicineByIdService = async (
    warehouseId: number,
    medicineId: number
) => {
    return await findWarehouseMedicineById(
        warehouseId,
        medicineId
    );
};

export const updateWarehouseMedicineService = async (
    warehouseId: number,
    medicineId: number,
    data: {
        stock?: number;
    }
) => {
    return await updateWarehouseMedicineById(
        warehouseId,
        medicineId,
        data
    );
};

export const deleteWarehouseMedicineService = async (
    warehouseId: number,
    medicineId: number
) => {
    return await deleteWarehouseMedicineById(
        warehouseId,
        medicineId
    );
};

