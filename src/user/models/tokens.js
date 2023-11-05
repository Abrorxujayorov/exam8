import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.connection.js";


class Token extends Model {}

Token.init ({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
            references: {
                model: 'users',
                key: 'id'
            },
    },
},
{
    sequelize,
    modelName: 'token',
    paranoid: true
})

export {
    Token
} 