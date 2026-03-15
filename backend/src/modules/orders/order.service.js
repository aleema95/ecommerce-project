import { sequelize, Order, OrderItem, Product } from "../../models/index.js";
import redisClient from "../../config/redis.js";
import stripe from "../../config/stripe.js";

//const getCartKey = (userId) => `cart:${userId}`;

export const createCheckoutSession = async (userId) => {

  const cartData = await redisClient.get(`cart:${userId}`);

  if (!cartData) {
    throw new Error("Cart is empty");
  }

  const cart = JSON.parse(cartData);

  const lineItems = [];

  let total = 0;

  for (const item of cart) {

    const product = await Product.findByPk(item.productId);

    if (!product) throw new Error("Product not found");

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name
        },
        unit_amount: Math.round(product.price * 100)
      },
      quantity: item.quantity
    });

    total += product.price * item.quantity;
  }

  const order = await Order.create({
    user_id: userId,
    total_price: total,
    status: "pending",
    payment_status: "unpaid"
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",

    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,

    metadata: {
      orderId: order.id
    }
  });

  return session.url;
};

/*export const checkout = async (userId) => {

  const cartData = await redisClient.get(getCartKey(userId));

  if (!cartData) {
      throw new Error("Cart is empty");
    }

    const cart = JSON.parse(cartData);
    
    const transaction = await sequelize.transaction();
    
    try {
        
        let total = 0;
        
        const order = await Order.create(
            { user_id: userId, total_price: 0 },
            { transaction }
        );
        
        
        for (const item of cart) {
            
            const product = await Product.findByPk(item.productId, { transaction });
            if (!product) {
                throw new Error("Product not found");
            }
            
            if (product.stock < item.quantity) {
                throw new Error("Not enough stock");
            }
            
            const itemTotal = product.price * item.quantity;
            
            total += itemTotal;
            
      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        price: product.price
      }, { transaction });

      product.stock -= item.quantity;

      await product.save({ transaction });

    }

    order.total_price = total;

    await order.save({ transaction });

    await transaction.commit();

    await redisClient.del(getCartKey(userId));

    return order;

  } catch (err) {

    await transaction.rollback();

    throw err;
  }
};*/