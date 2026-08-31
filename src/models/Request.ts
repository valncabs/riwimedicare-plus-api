import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

/**
 * Represents a Request entity in the database.
 *
 * - Each request links a clinic, a medicine, and a warehouse.
 * - Tracks the quantity requested and the current status of the request.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class Request
 * @extends Model
 *
 * @property {number} id - Unique identifier for the request (auto-incremented).
 * @property {number} clinicId - ID of the clinic making the request.
 * @property {number} medicineId - ID of the medicine being requested.
 * @property {number} warehouseId - ID of the warehouse fulfilling the request.
 * @property {number} quantity - Quantity of medicine requested (must be at least 1).
 * @property {string} status - Current status of the request (`pending`, `approved`, `rejected`, `completed`).
 * @property {Date} createdAt - Date and time when the request was created.
 * @property {Date} updatedAt - Date and time when the request was last updated.
 */
class Request extends Model<
    InferAttributes<Request>,
    InferCreationAttributes<Request>
> {
    declare id: CreationOptional<number>;
    declare clinicId: number;
    declare medicineId: number;
    declare warehouseId: number;
    declare quantity: number;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

/**
 * Initializes the Request model with its schema definition.
 *
 * - Maps the Request entity to the "requests" table in the database.
 * - Defines column types, constraints, and default values.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        medicineId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        status: {
            type: DataTypes.ENUM(
                "pending",
                "approved",
                "rejected",
                "completed"
            ),
            allowNull: false,
            defaultValue: "pending"
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
        tableName: "requests",
        timestamps: true
    }
);

export default Request;
