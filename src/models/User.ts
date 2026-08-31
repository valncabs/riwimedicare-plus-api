import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";

/**
 * Represents a User entity in the database.
 *
 * - Each user has identifying information such as name, email, and password.
 * - Users are associated with a role (`roleId`) to manage permissions.
 * - The `status` field indicates whether the account is active.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class User
 * @extends Model
 *
 * @property {number} id - Unique identifier for the user (auto-incremented).
 * @property {string} name - Full name of the user.
 * @property {string} email - Unique email address of the user.
 * @property {string} password - Encrypted password for authentication.
 * @property {number} roleId - ID of the role assigned to the user.
 * @property {boolean} status - Indicates if the user account is active (default: true).
 * @property {Date} createdAt - Date and time when the user account was created.
 * @property {Date} updatedAt - Date and time when the user account was last updated.
 */
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare roleId: number;
    declare status: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Initializes the User model with its schema definition.
 *
 * - Maps the User entity to the "users" table in the database.
 * - Defines column types, constraints, and uniqueness.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
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
        tableName: "users",
        timestamps: true
    }
);

export default User;
