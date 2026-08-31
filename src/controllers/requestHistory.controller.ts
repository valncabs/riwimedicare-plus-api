
import { Request, Response } from "express";
import {
    createRequestHistoryService,
    getAllRequestHistoryService,
    getRequestHistoryByIdService,
    getRequestHistoryByRequestIdService
} from "../services/requestHistory.service";

/**
 * Creates a new request history entry.
 * Validates requestId, status, and user information before saving.
 *
 * @param {Request} req - Express request object containing requestId and status in the body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the created history or an error message.
 */
export const createRequestHistory = async (req: Request, res: Response) => { 
    try {
        const requestId = Number(req.body.requestId);
        const { status } = req.body;

        if (
            isNaN(requestId) ||
            !status ||
            !req.user
        ) {
            return res.status(400).json({
                message: "Invalid request history data"
            });
        }

        const history = await createRequestHistoryService({
            requestId,
            status,
            userId: req.user.id
        });

        return res.status(201).json(history);
    } catch {
        return res.status(400).json({
            message: "Could not create request history"
        });
    }
};

/**
 * Retrieves all request history entries.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with all request history or an error message.
 */
export const getRequestHistory = async (req: Request, res: Response) => {
    try {
        const history = await getAllRequestHistoryService();

        return res.status(200).json(history);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve request history"
        });
    }
};

/**
 * Retrieves a request history entry by its ID.
 *
 * @param {Request} req - Express request object containing history ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the history entry or an error message.
 */
export const getRequestHistoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid history ID"
            });
        }

        const history = await getRequestHistoryByIdService(id);

        if (!history) {
            return res.status(404).json({
                message: "Request history not found"
            });
        }

        return res.status(200).json(history);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve request history"
        });
    }
};

/**
 * Retrieves all history entries for a specific request ID.
 *
 * @param {Request} req - Express request object containing requestId in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the request history or an error message.
 */
export const getHistoryByRequestId = async (req: Request, res: Response) => { 
    try {
        const requestId = Number(req.params.requestId);

        if (isNaN(requestId)) {
            return res.status(400).json({
                message: "Invalid request ID"
            });
        }

        const history =
            await getRequestHistoryByRequestIdService(requestId);

        return res.status(200).json(history);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve request history"
        });
    }
};

