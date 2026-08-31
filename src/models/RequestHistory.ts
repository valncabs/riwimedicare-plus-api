import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

/**
 * Represents a RequestHistory entity in the database.
 *
 * - Each record stores the status change of a specific request.
 * - Tracks which user performed the action and when it occurred.
 * - Useful for auditing and monitoring the lifecycle of requests.
 *
 * @class RequestHistory
 * @extends Model
 *
 * @property {number} id - Unique identifier for the request history entry (auto-incremented).
 * @property {number} requestId - ID of the request associated with this history entry.
 * @property {string} status - Status of the request at this point in history.
 * @property {Date} createdAt - Date and time when this history entry was created.
 * @property {number} userId - ID of the user who performed the action.
 */
class RequestHistory extends Model<
    InferAttributes<RequestHistory>,
    InferCreationAttributes<RequestHistory>
> {
    declare id: CreationOptional<number>;
    declare requestId: number;
    declare status: string;
    declare createdAt: CreationOptional<Date>;
    declare userId: number;
}

/**
 * Initializes the RequestHistory model with its schema definition.
 *
 * - Maps the RequestHistory entity to the "request_history" table in the database.
 * - Defines column types, constraints, and relationships.
 * - Does not use automatic timestamps (`createdAt` is managed manually).
 */
RequestHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "request_history",
        timestamps: false
    }
);

export default RequestHistory;
