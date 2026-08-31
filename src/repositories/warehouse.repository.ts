import Warehouse from "../models/Warehouse";

/**
 * Creates a new warehouse.
 *
 * @param {Object} data - Data required to create a warehouse.
 * @param {string} data.name - Name of the warehouse.
 * @param {string} data.location - Location of the warehouse.
 * @returns {Promise<Warehouse>} - The newly created warehouse instance.
 */
export const createWarehouse = async (data: {
    name: string;
    location: string;
}) => {
    return await Warehouse.create(data);
};

/**
 * Returns all active warehouses.
 *
 * @returns {Promise<Warehouse[]>} - Array of active warehouses.
 */
export const findAllWarehouses = async () => {
    return await Warehouse.findAll({
        where: {
            status: true
        }
    });
};

/**
 * Finds an active warehouse by ID.
 *
 * @param {number} id - Warehouse identifier.
 * @returns {Promise<Warehouse | null>} - The warehouse if found, otherwise null.
 */
export const findWarehouseById = async (id: number) => {
    return await Warehouse.findOne({
        where: {
            id,
            status: true
        }
    });
};

/**
 * Updates a warehouse by ID.
 *
 * @param {number} id - Warehouse identifier.
 * @param {Object} data - Partial data to update.
 * @param {string} [data.name] - Updated name of the warehouse.
 * @param {string} [data.location] - Updated location of the warehouse.
 * @param {boolean} [data.status] - Updated status of the warehouse.
 * @returns {Promise<Warehouse | null>} - The updated warehouse if found, otherwise null.
 */
export const updateWarehouseById = async (
    id: number,
    data: {
        name?: string;
        location?: string;
        status?: boolean;
    }
) => {
    const warehouse = await Warehouse.findByPk(id);

    if (!warehouse) {
        return null;
    }

    await warehouse.update(data);

    return warehouse;
};

/**
 * Deactivates a warehouse instead of deleting it permanently (soft delete).
 *
 * @param {number} id - Warehouse identifier.
 * @returns {Promise<Warehouse | null>} - The deactivated warehouse if found, otherwise null.
 */
export const deleteWarehouseById = async (id: number) => {
    const warehouse = await Warehouse.findByPk(id);

    if (!warehouse) {
        return null;
    }

    warehouse.status = false;

    await warehouse.save();

    return warehouse;
};
