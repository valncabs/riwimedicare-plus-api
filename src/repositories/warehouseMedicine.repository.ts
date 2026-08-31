import WarehouseMedicine from "../models/WarehouseMedicine";

/**
 * Creates a new warehouse-medicine record.
 *
 * @param {Object} data - Data required to create the record.
 * @param {number} data.warehouseId - ID of the warehouse.
 * @param {number} data.medicineId - ID of the medicine.
 * @param {number} data.stock - Initial stock quantity.
 * @returns {Promise<WarehouseMedicine>} - The newly created warehouse-medicine instance.
 */
export const createWarehouseMedicine = async (data: {
    warehouseId: number;
    medicineId: number;
    stock: number;
}) => {
    return await WarehouseMedicine.create(data);
};

/**
 * Returns all medicines stored in a specific warehouse.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @returns {Promise<WarehouseMedicine[]>} - Array of warehouse-medicine records.
 */
export const findAllWarehouseMedicines = async (
    warehouseId: number
) => {
    return await WarehouseMedicine.findAll({
        where: {
            warehouseId
        }
    });
};

/**
 * Finds a specific medicine in a warehouse by IDs.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @param {number} medicineId - Medicine identifier.
 * @returns {Promise<WarehouseMedicine | null>} - The warehouse-medicine record if found, otherwise null.
 */
export const findWarehouseMedicineById = async (
    warehouseId: number,
    medicineId: number
) => {
    return await WarehouseMedicine.findOne({
        where: {
            warehouseId,
            medicineId
        }
    });
};

/**
 * Updates the stock of a specific medicine in a warehouse.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @param {number} medicineId - Medicine identifier.
 * @param {Object} data - Partial data to update.
 * @param {number} [data.stock] - Updated stock quantity.
 * @returns {Promise<WarehouseMedicine | null>} - The updated record if found, otherwise null.
 */
export const updateWarehouseMedicineById = async (
    warehouseId: number,
    medicineId: number,
    data: {
        stock?: number;
    }
) => {
    const warehouseMedicine = await findWarehouseMedicineById(
        warehouseId,
        medicineId
    );

    if (!warehouseMedicine) {
        return null;
    }

    await warehouseMedicine.update(data);

    return warehouseMedicine;
};

/**
 * Deletes a warehouse-medicine record permanently.
 *
 * @param {number} warehouseId - Warehouse identifier.
 * @param {number} medicineId - Medicine identifier.
 * @returns {Promise<WarehouseMedicine | null>} - The deleted record if found, otherwise null.
 */
export const deleteWarehouseMedicineById = async (
    warehouseId: number,
    medicineId: number
) => {
    const warehouseMedicine = await findWarehouseMedicineById(
        warehouseId,
        medicineId
    );

    if (!warehouseMedicine) {
        return null;
    }

    await warehouseMedicine.destroy();

    return warehouseMedicine;
};
