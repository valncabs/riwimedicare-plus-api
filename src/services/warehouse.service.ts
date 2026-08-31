import {
    createWarehouse,
    findAllWarehouses,
    findWarehouseById,
    updateWarehouseById,
    deleteWarehouseById
} from "../repositories/warehouse.repository";

/**
 * Creates a new warehouse.
 *
 * - Validates that name and location are provided.
 * - Prevents duplicate warehouses by name.
 *
 * @param {Object} data - Data required to create a warehouse.
 * @returns {Promise<Warehouse>} - The newly created warehouse instance.
 */
export const createWarehouseService = async (data: {
    name: string;
    location: string;
}) => {
    if (!data.name || !data.location) {
        throw new Error("Name and location are required");
    }

    const warehouses = await findAllWarehouses();
    const duplicate = warehouses.find(
        (w) => w.name.toLowerCase() === data.name.toLowerCase()
    );

    if (duplicate) {
        throw new Error("A warehouse with this name already exists");
    }

    return await createWarehouse(data);
};

/**
 * Returns all active warehouses.
 *
 * @returns {Promise<Warehouse[]>} - Array of active warehouses.
 */
export const getAllWarehousesService = async () => {
    return await findAllWarehouses();
};

/**
 * Returns an active warehouse by ID.
 *
 * - Throws an error if not found.
 *
 * @param {number} id - Warehouse identifier.
 * @returns {Promise<Warehouse>} - The warehouse instance if found.
 */
export const getWarehouseByIdService = async (id: number) => {
    const warehouse = await findWarehouseById(id);

    if (!warehouse) {
        throw new Error("Warehouse not found");
    }

    return warehouse;
};

/**
 * Updates an existing warehouse.
 *
 * - Validates existence before updating.
 * - Ensures name uniqueness if updated.
 *
 * @param {number} id - Warehouse identifier.
 * @param {Object} data - Partial data to update.
 * @returns {Promise<Warehouse>} - The updated warehouse instance.
 */
export const updateWarehouseService = async (
    id: number,
    data: {
        name?: string;
        location?: string;
        status?: boolean;
    }
) => {
    const warehouse = await findWarehouseById(id);

    if (!warehouse) {
        throw new Error("Warehouse not found");
    }

    if (data.name && data.name !== warehouse.name) {
        const warehouses = await findAllWarehouses();
        const duplicate = warehouses.find(
            (w) => w.name.toLowerCase() === data.name!.toLowerCase()
        );

        if (duplicate) {
            throw new Error("A warehouse with this name already exists");
        }
    }

    return await updateWarehouseById(id, data);
};

/**
 * Deactivates a warehouse (soft delete).
 *
 * - Throws an error if not found.
 *
 * @param {number} id - Warehouse identifier.
 * @returns {Promise<Warehouse>} - The deactivated warehouse instance.
 */
export const deleteWarehouseService = async (id: number) => {
    const warehouse = await deleteWarehouseById(id);

    if (!warehouse) {
        throw new Error("Warehouse not found");
    }

    return warehouse;
};
