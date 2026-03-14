import { DataTypes } from "sequelize";

export default (sequelize) => {

  const Order = sequelize.define("Order", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    total_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "pending"
    }

  }, {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  return Order;
};