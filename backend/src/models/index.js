import sequelize from "../config/database.js";
import ProductModel from "./product.model.js";

const Product = ProductModel(sequelize);

export { sequelize, Product };