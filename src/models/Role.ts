import { DataTypes, Model, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>{
    declare id: number;
    declare name: string;
}

Role.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
},{
    sequelize,
    tableName: "roles",
    timestamps: true,
});

export default Role