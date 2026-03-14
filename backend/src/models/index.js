import sequelize from "../config/database.js";
import ProductModel from "./product.model.js";
import userModel from "./user.model.js";

const Product = ProductModel(sequelize);
const User = userModel(sequelize)

export { sequelize, Product, User };