import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

class Clinic extends Model<InferAttributes<Clinic>, InferCreationAttributes<Clinic>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare nit: string;
    declare address: string;
    declare phone: string;
    declare responsible: string;
    declare status: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Clinic.init(
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

        nit: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },

        responsible: {
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
        tableName: "clinics",
        timestamps: true
    }
);

export default Clinic;