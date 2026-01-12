const mongoose = require('mongoose');
const Pizza = require('../models/Pizza');
const pizzas = require('../data/pizzaa'); // your existing JSON

mongoose.connect('mongodb://127.0.0.1:27017/pizzeria');

async function seed() {
  await Pizza.deleteMany();
  await Pizza.insertMany(pizzas);
  console.log('🍕 Pizzas seeded');
  process.exit();
}

seed();
