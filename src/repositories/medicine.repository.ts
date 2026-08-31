import Medicine from "../models/Medicine";

export const createMedicine = async (data: {
    name: string;
    description?: string;
}) => {
    return await Medicine.create(data);
};

export const findAllMedicines = async () => {
    return await Medicine.findAll({
        where: {
            status: true
        }
    });
};

export const findMedicineById = async (id: number) => {
    return await Medicine.findOne({
        where: {
            id,
            status: true
        }
    });
};

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

export const deleteMedicineById = async (id: number) => {
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
        return null;
    }

    medicine.status = false;

    await medicine.save();

    return medicine;
};