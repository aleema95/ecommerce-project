//import { checkout } from "./order.service.js";
import { createCheckoutSession } from "./order.service.js";

export const checkoutOrder = async (req, res) => {

  try {

    const url = await createCheckoutSession(req.user.id);

    res.json({ checkoutUrl: url });

  } catch (err) {

    res.status(400).json({ message: err.message });

  }
};

/*export const checkoutOrder = async (req, res) => {

  try {

    const order = await checkout(req.user.id);
    
    res.json(order);

  } catch (err) {

    res.status(400).json({
      message: err.message
    });

  }
};*/