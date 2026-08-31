import RequestHistory from "../models/RequestHistory";

/**
 * Creates a new request history entry.
 *
 * @param {Object} data - Data required to create a request history.
 * @param {number} data.requestId - ID of the request associated with this history entry.
 * @param {string} data.status - Status of the request at this point in history.
 * @param {number} data.userId - ID of the user who performed the action.
 * @returns {Promise<RequestHistory>} - The newly created request history instance.
 */
export const createRequestHistory = async (data: {
    requestId: number;
    status: string;
    userId: number;
}) => {
    return await RequestHistory.create({
        ...data,
        createdAt: new Date()
    });
};

/**
 * Returns all request history entries ordered by creation date (latest first).
 *
 * @returns {Promise<RequestHistory[]>} - Array of request history entries.
 */
export const findAllRequestHistory = async () => {
    return await RequestHistory.findAll({
        order: [["createdAt", "DESC"]]
    });
};

/**
 * Finds a request history entry by ID.
 *
 * @param {number} id - Request history identifier.
 * @returns {Promise<RequestHistory | null>} - The request history entry if found, otherwise null.
 */
export const findRequestHistoryById = async (id: number) => {
    return await RequestHistory.findByPk(id);
};

/**
 * Finds all history entries for a specific request.
 *
 * @param {number} requestId - Request identifier.
 * @returns {Promise<RequestHistory[]>} - Array of history entries for the given request.
 */
export const findRequestHistoryByRequestId = async (
    requestId: number
) => {
    return await RequestHistory.findAll({
        where: {
            requestId
        },
        order: [["createdAt", "DESC"]]
    });
};
