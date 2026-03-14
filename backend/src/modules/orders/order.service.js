import { sequelize, Order, OrderItem, Product } from "../../models/index.js";
import redisClient from "../../config/redis.js";

const getCartKey = (userId) => `cart:${userId}`;

export const checkout = async (userId) => {

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
};