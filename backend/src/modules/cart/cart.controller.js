import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from "./cart.service.js";

export const getUserCart = async (req, res) => {

  const cart = await getCart(req.user.id);

  res.json(cart);
};

export const addItem = async (req, res) => {

  const { productId, quantity } = req.body;

  const cart = await addToCart(
    req.user.id,
    productId,
    quantity
  );

  res.json(cart);
};

export const removeItem = async (req, res) => {

  const { productId, quantity } = req.body;

  const cart = await removeFromCart(
    req.user.id,
    productId,
    quantity || 1
  );

  res.json(cart);
};

export const clearUserCart = async (req, res) => {

  await clearCart(req.user.id);

  res.json({ message: "Cart cleared" });
};