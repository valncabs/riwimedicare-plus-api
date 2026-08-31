import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional, // 1. Agrega esto
} from "sequelize";

import sequelize from "../config/database";

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
    declare id: CreationOptional<number>; 
    declare token: string;
    declare userId: number;
    declare expiresAt: Date;
}



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