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
 */
export const createClinic = async (data: CreateClinicData) => {
    return await Clinic.create(data);
};

/**
 * Returns all active clinics.
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