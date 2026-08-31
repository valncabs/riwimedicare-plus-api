import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

/**
 * Represents a Role entity in the database.
 *
 * - Each role defines a set of permissions or responsibilities for users.
 * - Roles are used to manage access control within the application.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class Role
 * @extends Model
 *
 * @property {number} id - Unique identifier for the role (auto-incremented).
 * @property {string} name - Name of the role (e.g., "admin", "user").
 */
class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: number;
    declare name: string;
}

/**
 * Initializes the Role model with its schema definition.
 *
 * - Maps the Role entity to the "roles" table in the database.
 * - Defines column types, constraints, and uniqueness.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "roles",
        timestamps: true,
    }
);

export default Role;
