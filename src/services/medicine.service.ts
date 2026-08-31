import {
    createMedicine,
    findAllMedicines,
    findMedicineById,
    updateMedicineById,
    deleteMedicineById
} from "../repositories/medicine.repository";

/**
 * Creates a new medicine.
 *
 * - Validates that the name is provided.
 * - Prevents duplicate medicines by name.
 *
 * @param {Object} data - Data required to create a medicine.
 * @param {string} data.name - Name of the medicine.
 * @param {string} [data.description] - Optional description.
 * @returns {Promise<Medicine>} - The newly created medicine instance.
 */
export const createMedicineService = async (data: {
    name: string;
    description?: string;
}) => {
    if (!data.name) {
        throw new Error("Medicine name is required");
    }

    const existingMedicines = await findAllMedicines();
    const duplicate = existingMedicines.find(
        (m) => m.name.toLowerCase() === data.name.toLowerCase()
    );

    if (duplicate) {
        throw new Error("A medicine with this name already exists");
    }

    return await createMedicine(data);
};

/**
 * Returns all active medicines.
 *
 * @returns {Promise<Medicine[]>} - Array of active medicines.
 */
export const getAllMedicinesService = async () => {
    return await findAllMedicines();
};

/**
 * Returns an active medicine by ID.
 *
 * - Throws an error if not found.
 *
 * @param {number} id - Medicine identifier.
 * @returns {Promise<Medicine>} - The medicine instance if found.
 */
export const getMedicineByIdService = async (id: number) => {
    const medicine = await findMedicineById(id);

    if (!medicine) {
        throw new Error("Medicine not found");
    }

    return medicine;
};

/**
 * Updates an existing medicine.
 *
 * - Validates existence before updating.
 * - Ensures name uniqueness if updated.
 *
 * @param {number} id - Medicine identifier.
 * @param {Object} data - Partial data to update.
 * @returns {Promise<Medicine>} - The updated medicine instance.
 */
export const updateMedicineService = async (
    id: number,
    data: {
        name?: string;
        description?: string;
        status?: boolean;
    }
) => {
    const medicine = await findMedicineById(id);

    if (!medicine) {
        throw new Error("Medicine not found");
    }

    if (data.name && data.name !== medicine.name) {
        const existingMedicines = await findAllMedicines();
        const duplicate = existingMedicines.find(
            (m) => m.name.toLowerCase() === data.name!.toLowerCase()
        );

        if (duplicate) {
            throw new Error("A medicine with this name already exists");
        }
    }

    return await updateMedicineById(id, data);
};

/**
 * Deactivates a medicine (soft delete).
 *
 * - Throws an error if not found.
 *
 * @param {number} id - Medicine identifier.
 * @returns {Promise<Medicine>} - The deactivated medicine instance.
 */
export const deleteMedicineService = async (id: number) => {
    const medicine = await deleteMedicineById(id);

    if (!medicine) {
        throw new Error("Medicine not found");
    }

    return medicine;
};
