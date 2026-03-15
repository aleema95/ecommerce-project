import stripe from "../../config/stripe.js";
import { Order } from "../../models/index.js";
import redisClient from "../../config/redis.js";

export const stripeWebhook = async (req, res) => {

  const sig = req.headers["stripe-signature"];

  let event;

  try {

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (err) {

    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    const orderId = session.metadata.orderId;

    const order = await Order.findByPk(orderId);

    if (order) {

      order.payment_status = "paid";
      order.status = "completed";

      await order.save();

      await redisClient.del(`cart:${order.user_id}`);
    }
  }

  res.json({ received: true });
};