import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.connection.js";
import { User } from "./user.models.js";
import Products from "./products.js";

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statuss: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Products,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export default Order