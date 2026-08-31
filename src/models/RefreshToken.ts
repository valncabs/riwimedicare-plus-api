import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import sequelize from "../config/database";

/**
 * Represents a RefreshToken entity in the database.
 *
 * - Each refresh token is linked to a specific user.
 * - Tokens are unique and have an expiration date.
 * - Used for maintaining user sessions securely without requiring frequent logins.
 *
 * @class RefreshToken
 * @extends Model
 *
 * @property {number} id - Unique identifier for the refresh token (auto-incremented).
 * @property {string} token - The refresh token string (unique).
 * @property {number} userId - The ID of the user associated with the token.
 * @property {Date} expiresAt - Expiration date and time of the token.
 */
class RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
> {
    declare id: CreationOptional<number>;
    declare token: string;
    declare userId: number;
    declare expiresAt: Date;
}

/**
 * Initializes the RefreshToken model with its schema definition.
 *
 * - Maps the RefreshToken entity to the "refresh_tokens" table in the database.
 * - Defines column types, constraints, and uniqueness.
 * - Enables automatic timestamp fields (`createdAt`, `updatedAt`).
 */
RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "refresh_tokens",
        timestamps: true,
    }
);

export default RefreshToken;
