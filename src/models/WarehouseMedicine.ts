import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

/**
 * Represents the WarehouseMedicine entity in the database.
 *
 * - Acts as a junction table between `Warehouse` and `Medicine`.
 * - Stores the stock quantity of each medicine in a specific warehouse.
 * - Ensures uniqueness of the warehouse-medicine pair through a composite index.
 * - Sequelize automatically manages `createdAt` and `updatedAt` timestamps.
 *
 * @class WarehouseMedicine
 * @extends Model
 *
 * @property {number} id - Unique identifier for the warehouse-medicine record (auto-incremented).
 * @property {number} warehouseId - ID of the warehouse where the medicine is stored.
 * @property {number} medicineId - ID of the medicine stored in the warehouse.
 * @property {number} stock - Quantity of the medicine available in the warehouse (default: 0).
 * @property {Date} createdAt - Date and time when the record was created.
 * @property {Date} updatedAt - Date and time when the record was last updated.
 */
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

/**
 * Initializes the WarehouseMedicine model with its schema definition.
 *
 * - Maps the WarehouseMedicine entity to the "warehouse_medicines" table in the database.
 * - Defines column types, constraints, and default values.
 * - Enforces a unique composite index on `warehouseId` and `medicineId`
 *   to prevent duplicate records for the same warehouse-medicine pair.
 */
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
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["warehouseId", "medicineId"]
            }
        ]
    }
);

export default WarehouseMedicine;
