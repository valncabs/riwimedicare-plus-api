import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

class Warehouse extends Model<InferAttributes<Warehouse>, InferCreationAttributes<Warehouse>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare location: string;
    declare status: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

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