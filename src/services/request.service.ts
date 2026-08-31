
import {
    createRequest,
    findAllRequests,
    findRequestById,
    updateRequestById,
    deleteRequestById
} from "../repositories/request.repository";

export const createRequestService = async (data: {
    clinicId: number;
    medicineId: number;
    warehouseId: number;
    quantity: number;
}) => {
    return await createRequest(data);
};

export const getAllRequestsService = async () => {
    return await findAllRequests();
};

export const getRequestByIdService = async (id: number) => {
    return await findRequestById(id);
};

export const updateRequestService = async (
    id: number,
    data: {
        clinicId?: number;
        medicineId?: number;
        warehouseId?: number;
        quantity?: number;
        status?: string;
    }
) => {
    return await updateRequestById(id, data);
};

export const deleteRequestService = async (id: number) => {
    return await deleteRequestById(id);
};