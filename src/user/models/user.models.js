import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.connection.js";


class User extends Model {}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gmail: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "users",
      paranoid: true,
    }
  );

  export { User }