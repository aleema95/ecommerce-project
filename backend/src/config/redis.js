import { createClient } from "redis";

console.log("Redis URL:", process.env.REDIS_URL);

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;