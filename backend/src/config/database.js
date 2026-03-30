import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    logging: false,
    dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
  }
);

export default sequelize;