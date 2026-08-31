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
 *
 * @param {Request} req - Express request object containing clinic data in the body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the created clinic or an error message.
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
 * Retrieves all active clinics.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with a list of clinics or an error message.
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
 * Retrieves an active clinic by its ID.
 *
 * @param {Request} req - Express request object containing clinic ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the clinic data or an error message.
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
 * Updates an existing clinic by its ID.
 *
 * @param {Request} req - Express request object containing clinic ID in params and updated data in body.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response with the updated clinic or an error message.
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
 * Deletes (deactivates) a clinic by its ID.
 *
 * @param {Request} req - Express request object containing clinic ID in params.
 * @param {Response} res - Express response object used to send back the result.
 * @returns {Promise<Response>} - Returns a JSON response confirming deletion or an error message.
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