
import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

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

