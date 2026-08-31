import Medicine from "../models/Medicine";

/**
 * Creates a new medicine.
 *
 * @param {Object} data - Data required to create a medicine.
 * @param {string} data.name - Name of the medicine.
 * @param {string} [data.description] - Optional description of the medicine.
 * @returns {Promise<Medicine>} - The newly created medicine instance.
 */
export const createMedicine = async (data: {
    name: string;
    description?: string;
}) => {
    return await Medicine.create(data);
};

/**
 * Returns all active medicines.
 *
 * @returns {Promise<Medicine[]>} - Array of active medicines.
 */
export const findAllMedicines = async () => {
    return await Medicine.findAll({
        where: {
            status: true
        }
    });
};

/**
 * Finds an active medicine by ID.
 *
 * @param {number} id - Medicine identifier.
 * @returns {Promise<Medicine | null>} - The medicine if found, otherwise null.
 */
export const findMedicineById = async (id: number) => {
    return await Medicine.findOne({
        where: {
            id,
            status: true
        }
    });
};

/**
 * Updates a medicine by ID.
 *
 * @param {number} id - Medicine identifier.
 * @param {Object} data - Partial data to update.
 * @param {string} [data.name] - Updated name of the medicine.
 * @param {string} [data.description] - Updated description of the medicine.
 * @param {boolean} [data.status] - Updated status of the medicine.
 * @returns {Promise<Medicine | null>} - The updated medicine if found, otherwise null.
 */
export const updateMedicineById = async (
    id: number,
    data: {
        name?: string;
        description?: string;
        status?: boolean;
    }
) => {
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
        return null;
    }

    await medicine.update(data);

    return medicine;
};

/**
 * Deactivates a medicine instead of deleting it permanently.
 *
 * @param {number} id - Medicine identifier.
 * @returns {Promise<Medicine | null>} - The deactivated medicine if found, otherwise null.
 */
export const deleteMedicineById = async (id: number) => {
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
        return null;
    }

    medicine.status = false;

    await medicine.save();

    return medicine;
};
