import Warehouse from "../models/Warehouse";

export const createWarehouse = async (data: {
    name: string;
    location: string;
}) => {
    return await Warehouse.create(data);
};

export const findAllWarehouses = async () => {
    return await Warehouse.findAll({
        where: {
            status: true
        }
    });
};

export const findWarehouseById = async (id: number) => {
    return await Warehouse.findOne({
        where: {
            id,
            status: true
        }
    });
};

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

export const deleteWarehouseById = async (id: number) => {
    const warehouse = await Warehouse.findByPk(id);

    if (!warehouse) {
        return null;
    }

    warehouse.status = false;

    await warehouse.save();

    return warehouse;
};