import sequelize from "../config/database.js";
import ProductModel from "./product.model.js";
import userModel from "./user.model.js";
import OrderModel from "./order.model.js";
import OrderItemModel from "./orderItem.model.js";

const Product = ProductModel(sequelize);
const User = userModel(sequelize)
const Order = OrderModel(sequelize)
const OrderItem = OrderItemModel(sequelize)

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

export { sequelize, Product, User, Order, OrderItem };