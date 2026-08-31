import sequelize from "../config/database";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare roleId: number;
    declare status: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}
User.init({
  id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
},{
    sequelize,
    tableName: "users",
    timestamps: true

})

export default User