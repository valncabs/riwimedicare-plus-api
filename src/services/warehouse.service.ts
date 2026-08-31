
import {
    createWarehouse,
    findAllWarehouses,
    findWarehouseById,
    updateWarehouseById,
    deleteWarehouseById
} from "../repositories/warehouse.repository";

export const createWarehouseService = async (data: {
    name: string;
    location: string;
}) => {
    return await createWarehouse(data);
};

export const getAllWarehousesService = async () => {
    return await findAllWarehouses();
};

export const getWarehouseByIdService = async (id: number) => {
    return await findWarehouseById(id);
};

export const updateWarehouseService = async (
    id: number,
    data: {
        name?: string;
        location?: string;
        status?: boolean;
    }
) => {
    return await updateWarehouseById(id, data);
};

export const deleteWarehouseService = async (id: number) => {
    return await deleteWarehouseById(id);
};
