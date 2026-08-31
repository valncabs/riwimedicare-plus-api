import WarehouseMedicine from "../models/WarehouseMedicine";

export const createWarehouseMedicine = async (data: {
    warehouseId: number;
    medicineId: number;
    stock: number;
}) => {
    return await WarehouseMedicine.create(data);
};

export const findAllWarehouseMedicines = async (
    warehouseId: number
) => {
    return await WarehouseMedicine.findAll({
        where: {
            warehouseId
        }
    });
};

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