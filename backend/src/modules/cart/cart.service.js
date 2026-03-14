import redisClient from "../../config/redis.js";
import { Product } from "../../models/index.js";

const getCartKey = (userId) => `cart:${userId}`;

export const getCart = async (userId) => {

  const cart = await redisClient.get(getCartKey(userId));

  if (!cart) return [];

  return JSON.parse(cart);
};

export const addToCart = async (userId, productId, quantity) => {

  const key = getCartKey(userId);

  const cart = await getCart(userId);

  const productExist = await Product.findByPk(productId)

  if(!productExist) throw Error('Product does not exist!')

  const existing = cart.find(item => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  await redisClient.set(key, JSON.stringify(cart));

  return cart;
};

export const removeFromCart = async (userId, productId, quantity = 1) => {

  const key = getCartKey(userId);

  let cart = await getCart(userId);

  const item = cart.find(i => i.productId === productId);

  if (!item) return cart;

  item.quantity -= quantity;

  if (item.quantity <= 0) {
    const updatedCart = cart.filter(i => i.productId !== productId);

    await redisClient.set(key, JSON.stringify(updatedCart));

    return updatedCart;
  }

  await redisClient.set(key, JSON.stringify(cart));

  return cart;
};

export const clearCart = async (userId) => {

  const key = getCartKey(userId);

  await redisClient.del(key);

  return [];
};