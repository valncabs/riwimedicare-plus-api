import sequelize from "../config/database";
import Clinic from "../models/Clinic";
import Warehouse from "../models/Warehouse";
import Medicine from "../models/Medicine";

/**
 * Seeds the database with initial data from a JSON file.
 *
 * - Opens a transaction to ensure atomicity.
 * - Parses the buffer into JSON.
 * - Validates that the JSON is an object.
 * - Inserts data into Clinics, Warehouses, and Medicines tables.
 * - Commits if successful, rolls back if an error occurs.
 *
 * @param {Buffer} fileBuffer - Buffer containing JSON file data.
 * @returns {Promise<{message: string}>} - Success message.
 */
export const seedDatabaseService = async (
    fileBuffer: Buffer
) => {
    const transaction = await sequelize.transaction();

    try {
        const jsonData = JSON.parse(fileBuffer.toString("utf-8"));

        if (!jsonData || typeof jsonData !== "object") {
            throw new Error("Invalid JSON data");
        }

        if (jsonData.clinics) {
            await Clinic.bulkCreate(jsonData.clinics, { transaction });
        }

        if (jsonData.warehouses) {
            await Warehouse.bulkCreate(jsonData.warehouses, { transaction });
        }

        if (jsonData.medicines) {
            await Medicine.bulkCreate(jsonData.medicines, { transaction });
        }

        await transaction.commit();

        return { message: "Database seeded successfully" };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
