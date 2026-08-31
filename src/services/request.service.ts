import {
    createRequest,
    findAllRequests,
    findRequestById,
    updateRequestById,
    deleteRequestById
} from "../repositories/request.repository";

/**
 * Creates a new request.
 *
 * - Validates that quantity is positive.
 * - Ensures clinicId, medicineId, and warehouseId are provided.
 *
 * @param {Object} data - Data required to create a request.
 * @returns {Promise<Request>} - The newly created request instance.
 */
export const createRequestService = async (data: {
    clinicId: number;
    medicineId: number;
    warehouseId: number;
    quantity: number;
}) => {
    if (!data.clinicId || !data.medicineId || !data.warehouseId) {
        throw new Error("Clinic, medicine, and warehouse IDs are required");
    }

    if (data.quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    return await createRequest(data);
};

/**
 * Returns all requests.
 *
 * @returns {Promise<Request[]>} - Array of requests.
 */
export const getAllRequestsService = async () => {
    return await findAllRequests();
};

/**
 * Returns a request by ID.
 *
 * - Throws an error if not found.
 *
 * @param {number} id - Request identifier.
 * @returns {Promise<Request>} - The request instance if found.
 */
export const getRequestByIdService = async (id: number) => {
    const request = await findRequestById(id);

    if (!request) {
        throw new Error("Request not found");
    }

    return request;
};

/**
 * Updates an existing request.
 *
 * - Validates existence before updating.
 * - Ensures quantity is positive if updated.
 *
 * @param {number} id - Request identifier.
 * @param {Object} data - Partial data to update.
 * @returns {Promise<Request>} - The updated request instance.
 */
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
    const request = await findRequestById(id);

    if (!request) {
        throw new Error("Request not found");
    }

    if (data.quantity !== undefined && data.quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    return await updateRequestById(id, data);
};

/**
 * Deletes a request permanently.
 *
 * - Throws an error if not found.
 *
 * @param {number} id - Request identifier.
 * @returns {Promise<Request>} - The deleted request instance.
 */
export const deleteRequestService = async (id: number) => {
    const request = await deleteRequestById(id);

    if (!request) {
        throw new Error("Request not found");
    }

    return request;
};
