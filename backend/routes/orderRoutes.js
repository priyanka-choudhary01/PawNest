const router = require("express").Router();
const Order = require("../models/order");
const Cart = require("../models/cart");


const User = require("../models/user");

router.post("/create", async (req, res) => {
  try {
    const { token, shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "Please provide address" });
    }

   
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const cart = await Cart.findOne({ user: user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

   
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

   
    const newOrder = new Order({
      user: user._id,
      items: orderItems,
      totalPrice: cart.totalPrice,
      shippingAddress
    });

    await newOrder.save();

    
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ user: user._id })
      .populate("items.product")
      .sort({ createdAt: -1 }); // latest first

    res.json({ orders });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
