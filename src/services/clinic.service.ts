import {
    createClinic,
    findAllClinics,
    findClinicById,
    findClinicByNit,
    updateClinicById,
    deleteClinicById,
    type CreateClinicData,
    type UpdateClinicData
} from "../repositories/clinic.repository";

/**
 * Creates a new clinic.
 *
 * - Validates that the NIT is unique before creation.
 * - Throws an error if a clinic with the same NIT already exists.
 *
 * @param {CreateClinicData} data - Data required to create a clinic.
 * @returns {Promise<Clinic>} - The newly created clinic instance.
 */
export const createClinicService = async (data: CreateClinicData) => {
    const existingClinic = await findClinicByNit(data.nit);

    if (existingClinic) {
        throw new Error("A clinic with this NIT already exists");
    }

    return await createClinic(data);
};

/**
 * Returns all active clinics.
 *
 * @returns {Promise<Clinic[]>} - Array of active clinics.
 */
export const getAllClinicsService = async () => {
    return await findAllClinics();
};

/**
 * Returns an active clinic by ID.
 *
 * - Throws an error if the clinic is not found.
 *
 * @param {number} id - Clinic identifier.
 * @returns {Promise<Clinic>} - The clinic instance if found.
 */
export const getClinicByIdService = async (id: number) => {
    const clinic = await findClinicById(id);

    if (!clinic) {
        throw new Error("Clinic not found");
    }

    return clinic;
};

/**
 * Updates an active clinic.
 *
 * - Validates existence of the clinic.
 * - Ensures NIT uniqueness if updated.
 *
 * @param {number} id - Clinic identifier.
 * @param {UpdateClinicData} data - Partial data to update.
 * @returns {Promise<Clinic>} - The updated clinic instance.
 */
export const updateClinicService = async (
    id: number,
    data: UpdateClinicData
) => {
    const clinic = await findClinicById(id);

    if (!clinic) {
        throw new Error("Clinic not found");
    }

    if (data.nit && data.nit !== clinic.nit) {
        const existingClinic = await findClinicByNit(data.nit);

        if (existingClinic) {
            throw new Error("A clinic with this NIT already exists");
        }
    }

    return await updateClinicById(id, data);
};

/**
 * Deactivates an active clinic (soft delete).
 *
 * - Throws an error if the clinic does not exist.
 *
 * @param {number} id - Clinic identifier.
 * @returns {Promise<Clinic>} - The deactivated clinic instance.
 */
export const deleteClinicService = async (id: number) => {
    const clinic = await deleteClinicById(id);

    if (!clinic) {
        throw new Error("Clinic not found");
    }

    return clinic;
};
