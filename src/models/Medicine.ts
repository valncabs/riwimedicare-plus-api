import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

/**
 * Represents a Medicine entity in the database.
 *
 * - Each medicine has a name, optional description, and status flag.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class Medicine
 * @extends Model
 *
 * @property {number} id - Unique identifier for the medicine (auto-incremented).
 * @property {string} name - Name of the medicine.
 * @property {string | null} description - Optional description of the medicine.
 * @property {boolean} status - Indicates if the medicine is active (default: true).
 * @property {Date} createdAt - Date and time when the medicine record was created.
 * @property {Date} updatedAt - Date and time when the medicine record was last updated.
 */
class Medicine extends Model<InferAttributes<Medicine>, InferCreationAttributes<Medicine>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: CreationOptional<string | null>;
    declare status: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

/**
 * Initializes the Medicine model with its schema definition.
 *
 * - Maps the Medicine entity to the "medicines" table in the database.
 * - Defines column types, constraints, and default values.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
Medicine.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "medicines",
        timestamps: true
    }
);

export default Medicine;
