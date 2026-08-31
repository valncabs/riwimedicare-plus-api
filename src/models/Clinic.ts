import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

/**
 * Represents a Clinic entity in the database.
 *
 * - Each clinic has identifying information such as name, NIT, address, phone, and responsible person.
 * - The `status` field indicates whether the clinic is active.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class Clinic
 * @extends Model
 *
 * @property {number} id - Unique identifier for the clinic (auto-incremented).
 * @property {string} name - Name of the clinic.
 * @property {string} nit - Unique tax identification number for the clinic.
 * @property {string} address - Physical address of the clinic.
 * @property {string} phone - Contact phone number of the clinic.
 * @property {string} responsible - Name of the person responsible for the clinic.
 * @property {boolean} status - Indicates if the clinic is active (default: true).
 */
class Clinic extends Model<
    InferAttributes<Clinic>,
    InferCreationAttributes<Clinic>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare nit: string;
    declare address: string;
    declare phone: string;
    declare responsible: string;
    declare status: CreationOptional<boolean>;
}

/**
 * Initializes the Clinic model with its schema definition.
 *
 * - Maps the Clinic entity to the "clinics" table in the database.
 * - Defines column types, constraints, and default values.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
Clinic.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nit: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        responsible: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "clinics",
        timestamps: true
    }
);

export default Clinic;
