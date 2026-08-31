import sequelize from "../config/database";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";

class RequestHistory extends Model<
    InferAttributes<RequestHistory>,
    InferCreationAttributes<RequestHistory>
> {
    declare id: CreationOptional<number>;
    declare requestId: number;
    declare status: string;
    declare createdAt: CreationOptional<Date>;
    declare userId: number;
}

RequestHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },

        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "request_history",
        timestamps: false
    }
);

export default RequestHistory;