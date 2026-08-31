import Request from "../models/Request";

/**
 * Creates a new request.
 *
 * @param {Object} data - Data required to create a request.
 * @param {number} data.clinicId - ID of the clinic making the request.
 * @param {number} data.medicineId - ID of the medicine being requested.
 * @param {number} data.warehouseId - ID of the warehouse fulfilling the request.
 * @param {number} data.quantity - Quantity of medicine requested.
 * @returns {Promise<Request>} - The newly created request instance.
 */
export const createRequest = async (data: {
    clinicId: number;
    medicineId: number;
    warehouseId: number;
    quantity: number;
}) => {
    return await Request.create(data);
};

/**
 * Returns all requests.
 *
 * @returns {Promise<Request[]>} - Array of requests.
 */
export const findAllRequests = async () => {
    return await Request.findAll();
};

/**
 * Finds a request by ID.
 *
 * @param {number} id - Request identifier.
 * @returns {Promise<Request | null>} - The request if found, otherwise null.
 */
export const findRequestById = async (id: number) => {
    return await Request.findByPk(id);
};

/**
 * Updates a request by ID.
 *
 * @param {number} id - Request identifier.
 * @param {Object} data - Partial data to update.
 * @param {number} [data.clinicId] - Updated clinic ID.
 * @param {number} [data.medicineId] - Updated medicine ID.
 * @param {number} [data.warehouseId] - Updated warehouse ID.
 * @param {number} [data.quantity] - Updated quantity.
 * @param {string} [data.status] - Updated status of the request.
 * @returns {Promise<Request | null>} - The updated request if found, otherwise null.
 */
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

/**
 * Deletes a request permanently.
 *
 * @param {number} id - Request identifier.
 * @returns {Promise<Request | null>} - The deleted request if found, otherwise null.
 */
export const deleteRequestById = async (id: number) => {
    const request = await Request.findByPk(id);

    if (!request) {
        return null;
    }

    await request.destroy();

    return request;
};
