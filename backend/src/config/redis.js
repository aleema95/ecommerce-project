import { createClient } from "redis";

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-12677.c114.us-east-1-4.ec2.cloud.redislabs.com',
        port: 12677
    }
});


redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;