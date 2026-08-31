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
 */
export const getAllClinicsService = async () => {
    return await findAllClinics();
};

/**
 * Returns an active clinic by ID.
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
 * Deactivates an active clinic.
 */
export const deleteClinicService = async (id: number) => {
    const clinic = await deleteClinicById(id);

    if (!clinic) {
        throw new Error("Clinic not found");
    }

    return clinic;
};