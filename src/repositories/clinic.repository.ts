import Clinic from "../models/Clinic";

export interface CreateClinicData {
    name: string;
    nit: string;
    address: string;
    phone: string;
    responsible: string;
}

export interface UpdateClinicData {
    name?: string;
    nit?: string;
    address?: string;
    phone?: string;
    responsible?: string;
}

/**
 * Creates a new clinic.
 *
 * @param {CreateClinicData} data - Data required to create a clinic.
 * @returns {Promise<Clinic>} - The newly created clinic instance.
 */
export const createClinic = async (data: CreateClinicData) => {
    return await Clinic.create(data);
};

/**
 * Returns all active clinics.
 *
 * @returns {Promise<Clinic[]>} - Array of active clinics.
 */
export const findAllClinics = async () => {
    return await Clinic.findAll({
        where: {
            status: true
        }
    });
};

/**
 * Finds an active clinic by ID.
 *
 * @param {number} id - Clinic identifier.
 * @returns {Promise<Clinic | null>} - The clinic if found, otherwise null.
 */
export const findClinicById = async (id: number) => {
    return await Clinic.findOne({
        where: {
            id,
            status: true
        }
    });
};

/**
 * Finds an active clinic by NIT.
 *
 * @param {string} nit - Clinic NIT (unique tax identifier).
 * @returns {Promise<Clinic | null>} - The clinic if found, otherwise null.
 */
export const findClinicByNit = async (nit: string) => {
    return await Clinic.findOne({
        where: {
            nit,
            status: true
        }
    });
};

/**
 * Updates an active clinic.
 *
 * @param {number} id - Clinic identifier.
 * @param {UpdateClinicData} data - Partial data to update.
 * @returns {Promise<Clinic | null>} - The updated clinic if found, otherwise null.
 */
export const updateClinicById = async (
    id: number,
    data: UpdateClinicData
) => {
    const clinic = await Clinic.findOne({
        where: {
            id,
            status: true
        }
    });

    if (!clinic) {
        return null;
    }

    await clinic.update(data);

    return clinic;
};

/**
 * Deactivates a clinic instead of deleting it permanently.
 *
 * @param {number} id - Clinic identifier.
 * @returns {Promise<Clinic | null>} - The deactivated clinic if found, otherwise null.
 */
export const deleteClinicById = async (id: number) => {
    const clinic = await Clinic.findOne({
        where: {
            id,
            status: true
        }
    });

    if (!clinic) {
        return null;
    }

    clinic.status = false;

    await clinic.save();

    return clinic;
};
