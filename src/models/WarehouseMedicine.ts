import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

class WarehouseMedicine extends Model<
    InferAttributes<WarehouseMedicine>,
    InferCreationAttributes<WarehouseMedicine>
> {
    declare id: CreationOptional<number>;
    declare warehouseId: number;
    declare medicineId: number;
    declare stock: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

WarehouseMedicine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        medicineId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        tableName: "warehouse_medicines",
        timestamps: true
    }
);

export default WarehouseMedicine;