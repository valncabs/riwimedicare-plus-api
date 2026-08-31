import type { Request, Response } from "express";
import {
    createClinicService,
    getAllClinicsService,
    getClinicByIdService,
    updateClinicService,
    deleteClinicService
} from "../services/clinic.service";

/**
 * Creates a new clinic.
 */
export const createClinic = async (req: Request, res: Response) => {
    try {
        const clinic = await createClinicService(req.body);

        return res.status(201).json({
            message: "Clinic created successfully",
            data: clinic
        });
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Error creating clinic";

        return res.status(400).json({
            message
        });
    }
};

/**
 * Returns all active clinics.
 */
export const getAllClinics = async (req: Request, res: Response) => {
    try {
        const clinics = await getAllClinicsService();

        return res.status(200).json({
            data: clinics
        });
    } catch {
        return res.status(500).json({
            message: "Error getting clinics"
        });
    }
};

/**
 * Returns an active clinic by ID.
 */
export const getClinicById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid clinic ID"
            });
        }

        const clinic = await getClinicByIdService(id);

        return res.status(200).json({
            data: clinic
        });
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Error getting clinic";

        return res.status(404).json({
            message
        });
    }
};

/**
 * Updates an active clinic.
 */
export const updateClinic = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid clinic ID"
            });
        }

        const clinic = await updateClinicService(id, req.body);

        return res.status(200).json({
            message: "Clinic updated successfully",
            data: clinic
        });
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Error updating clinic";

        return res.status(400).json({
            message
        });
    }
};

/**
 * Deactivates an active clinic.
 */
export const deleteClinic = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid clinic ID"
            });
        }

        await deleteClinicService(id);

        return res.status(200).json({
            message: "Clinic deleted successfully"
        });
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Error deleting clinic";

        return res.status(404).json({
            message
        });
    }
};