import {
    createRequestHistory,
    findAllRequestHistory,
    findRequestHistoryById,
    findRequestHistoryByRequestId
} from "../repositories/requestHistory.repository";

/**
 * Creates a new request history entry.
 *
 * - Validates that requestId, status, and userId are provided.
 * - Ensures status is not empty.
 * - Automatically sets createdAt in the repository.
 *
 * @param {Object} data - Data required to create a request history.
 * @returns {Promise<RequestHistory>} - The newly created history entry.
 */
export const createRequestHistoryService = async (data: {
    requestId: number;
    status: string;
    userId: number;
}) => {
    if (!data.requestId || !data.userId) {
        throw new Error("Request ID and User ID are required");
    }

    if (!data.status || data.status.trim() === "") {
        throw new Error("Status is required");
    }

    return await createRequestHistory(data);
};

/**
 * Returns all request history entries ordered by creation date.
 *
 * @returns {Promise<RequestHistory[]>} - Array of history entries.
 */
export const getAllRequestHistoryService = async () => {
    return await findAllRequestHistory();
};

/**
 * Returns a request history entry by ID.
 *
 * - Throws an error if not found.
 *
 * @param {number} id - History identifier.
 * @returns {Promise<RequestHistory>} - The history entry if found.
 */
export const getRequestHistoryByIdService = async (id: number) => {
    const history = await findRequestHistoryById(id);

    if (!history) {
        throw new Error("Request history not found");
    }

    return history;
};

/**
 * Returns all history entries for a specific request.
 *
 * - Throws an error if none exist.
 *
 * @param {number} requestId - Request identifier.
 * @returns {Promise<RequestHistory[]>} - Array of history entries.
 */
export const getRequestHistoryByRequestIdService = async (
    requestId: number
) => {
    const history = await findRequestHistoryByRequestId(requestId);

    if (!history || history.length === 0) {
        throw new Error("No history found for this request");
    }

    return history;
};
