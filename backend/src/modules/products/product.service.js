import { Product } from "../../models/index.js";
import redisClient from "../../config/redis.js";

const CACHE_TTL = 3600;


export const fetchProducts = async () => {

  const cache = await redisClient.get("products:all");
  if (cache) {
    return JSON.parse(cache);
  }

  const products = await Product.findAll();

  await redisClient.setEx(
    "products:all",
    CACHE_TTL,
    JSON.stringify(products)
  );

  return products
};

export const fetchProduct = async (id) => {

  const cacheKey = `product:${id}`;

  const cache = await redisClient.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const product = await Product.findByPk(id);

  if (!product) return null;

  await redisClient.setEx(
    cacheKey,
    CACHE_TTL,
    JSON.stringify(product)
  );

  return product;
};

export const addProduct = async (data) => {

  const product = await Product.create(data);

  //Borra el cache porque cambia al agregarse un producto
  await redisClient.del("products:all");

  return product
};