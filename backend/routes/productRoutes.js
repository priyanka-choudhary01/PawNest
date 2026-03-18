const express = require("express");
const router = express.Router();
const Product = require("../models/product");


router.get("/products", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});
router.get("/check/:id", async (req, res) => {
  const ID = req.params.id;
  console.log("ID:", ID);

  if (!ID) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const product = await Product.findById(ID);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/best-sellers", async (req, res) => {

  try {

    const bestSellers = await Product.find({
      rating: { $gt: 4 }
    });

    res.json(bestSellers);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});
// router.post("/add-product", async (req, res) => {
//   try {

//     const product = new Product(req.body);

//     const savedProduct = await product.save();

//     res.status(201).json(savedProduct);

//   } catch (error) {

//     res.status(500).json({ message: error.message });

//   }
// });

router.get("/getproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;