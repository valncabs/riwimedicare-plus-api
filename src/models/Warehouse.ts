import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

/**
 * Represents a Warehouse entity in the database.
 *
 * - Each warehouse stores medicines and is linked to requests.
 * - Contains identifying information such as name and location.
 * - The `status` field indicates whether the warehouse is active.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class Warehouse
 * @extends Model
 *
 * @property {number} id - Unique identifier for the warehouse (auto-incremented).
 * @property {string} name - Name of the warehouse.
 * @property {string} location - Physical location of the warehouse.
 * @property {boolean} status - Indicates if the warehouse is active (default: true).
 * @property {Date} createdAt - Date and time when the warehouse record was created.
 * @property {Date} updatedAt - Date and time when the warehouse record was last updated.
 */
class Warehouse extends Model<InferAttributes<Warehouse>, InferCreationAttributes<Warehouse>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare location: string;
    declare status: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

/**
 * Initializes the Warehouse model with its schema definition.
 *
 * - Maps the Warehouse entity to the "warehouses" table in the database.
 * - Defines column types, constraints, and default values.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
Warehouse.init(
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
        location: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: "warehouses",
        timestamps: true
    }
);

export default Warehouse;
