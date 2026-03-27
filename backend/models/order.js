const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  }

});

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [orderItemSchema],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "pending"
  },

  shippingAddress: {
    type: String,
    required:true
  },
 contact: {
  type: String,
  required: true,
  match: [/^\d{10}$/, "Contact number must be exactly 10 digits"]
},
  shippingMethod:{
    type:String,
    default:"standard",
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);