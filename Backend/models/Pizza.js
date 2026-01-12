const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  id: String,
  iname: String
}, { _id: false });

const toppingSchema = new mongoose.Schema({
  id: String,
  tname: String,
  price: Number
}, { _id: false });

const pizzaSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  price: Number,
  image: String,
  description: String,
  ingredients: [ingredientSchema],
  topping: [toppingSchema]
});

module.exports = mongoose.model('Pizza', pizzaSchema);
