const mongoose = require('mongoose');

const pizzaItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  price: Number,
  qty: Number,
  total: Number,
  image: String
}, { _id: false });

const ingredientItemSchema = new mongoose.Schema({
  id: Number,
  tname: String,
  price: Number,
  image: String
}, { _id: false });

const cartSchema = new mongoose.Schema({
  pizzas: [pizzaItemSchema],        // ✅ ARRAY OF OBJECTS
  ingredients: [ingredientItemSchema],
  grandTotal: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);
