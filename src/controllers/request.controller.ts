
import { Request, Response } from "express";
import {
    createRequestService,
    getAllRequestsService,
    getRequestByIdService,
    updateRequestService,
    deleteRequestService
} from "../services/request.service";

export const createRequest = async (
    req: Request,
    res: Response
) => {
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

export const getRequests = async (
    req: Request,
    res: Response
) => {
    try {
        const requests = await getAllRequestsService();

        return res.status(200).json(requests);
    } catch {
        return res.status(500).json({
            message: "Could not retrieve requests"
        });
    }
};

export const getRequest = async (
    req: Request,
    res: Response
) => {
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

export const updateRequest = async (
    req: Request,
    res: Response
) => {
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

export const deleteRequest = async (
    req: Request,
    res: Response
) => {
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

