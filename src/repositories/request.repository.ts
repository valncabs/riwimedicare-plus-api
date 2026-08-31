
import Request from "../models/Request";

export const createRequest = async (data: {
    clinicId: number;
    medicineId: number;
    warehouseId: number;
    quantity: number;
}) => {
    return await Request.create(data);
};

export const findAllRequests = async () => {
    return await Request.findAll();
};

export const findRequestById = async (id: number) => {
    return await Request.findByPk(id);
};

export const updateRequestById = async (
    id: number,
    data: {
        clinicId?: number;
        medicineId?: number;
        warehouseId?: number;
        quantity?: number;
        status?: string;
    }
) => {
    const request = await Request.findByPk(id);

    if (!request) {
        return null;
    }

    await request.update(data);

    return request;
};

export const deleteRequestById = async (id: number) => {
    const request = await Request.findByPk(id);

    if (!request) {
        return null;
    }

    await request.destroy();

    return request;
};

