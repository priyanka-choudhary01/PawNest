const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/images", express.static("public/pictures"));

const start = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    app.listen(8080, () => {
      console.log("Server running on port 8080");
    });

  } catch (error) {
    console.log(error);
  }
};

start();