import { checkout } from "./order.service.js";

export const checkoutOrder = async (req, res) => {

  try {

    const order = await checkout(req.user.id);
    
    res.json(order);

  } catch (err) {

    res.status(400).json({
      message: err.message
    });

  }
};