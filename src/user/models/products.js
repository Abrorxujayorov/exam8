import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.connection.js";


class Products extends Model {}

Products.init ({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    file: DataTypes.STRING,
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    }
},
{
    sequelize,
    modelName: 'products',
    paranoid: true
})

export default Products