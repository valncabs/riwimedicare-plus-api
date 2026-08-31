import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

class Medicine extends Model<InferAttributes<Medicine>, InferCreationAttributes<Medicine>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: CreationOptional<string | null>;
    declare status: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

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