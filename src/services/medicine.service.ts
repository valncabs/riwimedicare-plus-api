import {
    createMedicine,
    findAllMedicines,
    findMedicineById,
    updateMedicineById,
    deleteMedicineById
} from "../repositories/medicine.repository";

export const createMedicineService = async (data: {
    name: string;
    description?: string;
}) => {
    return await createMedicine(data);
};

export const getAllMedicinesService = async () => {
    return await findAllMedicines();
};

export const getMedicineByIdService = async (id: number) => {
    return await findMedicineById(id);
};

export const updateMedicineService = async (
    id: number,
    data: {
        name?: string;
        description?: string;
        status?: boolean;
    }
) => {
    return await updateMedicineById(id, data);
};

export const deleteMedicineService = async (id: number) => {
    return await deleteMedicineById(id);
};