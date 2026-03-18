const router = require("express").Router();
const Cart = require("../models/cart");
const Product = require("../models/product");

// Add to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity, token } = req.body;

    const User = require("../models/user");
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({
        user: user._id,
        items: [],
        totalPrice: 0
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.populate("items.product");

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    await cart.save();

    res.json({ message: "Product added", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { token } = req.query;

    const User = require("../models/user");
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: user._id })
      .populate("items.product");

    if (!cart) {
      return res.json({
        items: [],
        totalPrice: 0
      });
    }

    res.json({
      items: cart.items,
      totalPrice: cart.totalPrice
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/removeitem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;

    const User = require("../models/user");
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== id
    );

    await cart.populate("items.product");

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    await cart.save();

    res.json({ message: "Item removed", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;