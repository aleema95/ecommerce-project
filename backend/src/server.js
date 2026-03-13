import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";
import { config } from "./config/env.js";
import redisClient from "./config/redis.js";

async function start() {
  try {

    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();

    await redisClient.connect();
    console.log("Redis connected");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

start();