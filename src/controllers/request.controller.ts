
import { Request, Response } from "express";
import {
    createRequestService,
    getAllRequestsService,
    getRequestByIdService,
    updateRequestService,
    deleteRequestService
} from "../services/request.service";

/**
 * Creates a new request for medicines from a clinic to a warehouse.
 *
 * @param {Request} req - Express request object containing clinicId, medicineId, warehouseId, and quantity in the body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the created request or an error message.
 */
export const createRequest = async (req: Request, res: Response) => {
    try {
        const {
            clinicId,
            medicineId,
            warehouseId,
            quantity
        } = req.body;

        if (
            !clinicId ||
            !medicineId ||
            !warehouseId ||
            !quantity ||
            quantity <= 0
        ) {
            return res.status(400).json({
                message: "Invalid request data"
            });
        }

        const request = await createRequestService({
            clinicId,
            medicineId,
            warehouseId,
            quantity
        });

        return res.status(201).json(request);
    } catch {
        return res.status(400).json({
            message: "Could not create request"
        });
    }
};

/**
 * Retrieves all requests.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with a list of requests or an error message.
 */
export const getRequests = async (req: Request, res: Response) => {
    try {
        const requests = await getAllRequestsService();

        return res.status(200).json(requests);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve requests"
        });
    }
};

/**
 * Retrieves a request by its ID.
 *
 * @param {Request} req - Express request object containing request ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the request data or an error message.
 */
export const getRequest = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid request ID"
            });
        }

        const request = await getRequestByIdService(id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        return res.status(200).json(request);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve request"
        });
    }
};

/**
 * Updates an existing request by its ID.
 *
 * @param {Request} req - Express request object containing request ID in params and updated data in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the updated request or an error message.
 */
export const updateRequest = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid request ID"
            });
        }

        const {
            clinicId,
            medicineId,
            warehouseId,
            quantity,
            status
        } = req.body;

        const request = await updateRequestService(id, {
            clinicId,
            medicineId,
            warehouseId,
            quantity,
            status
        });

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        return res.status(200).json(request);
    } catch {
        return res.status(400).json({
            message: "Could not update request"
        });
    }
};

/**
 * Deletes (deactivates) a request by its ID.
 *
 * @param {Request} req - Express request object containing request ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response confirming deletion or an error message.
 */
export const deleteRequest = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid request ID"
            });
        }

        const request = await deleteRequestService(id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        return res.status(200).json({
            message: "Request deleted successfully"
        });
    } catch {
        return res.status(500).json({
            message: "Could not delete request"
        });
    }
};

