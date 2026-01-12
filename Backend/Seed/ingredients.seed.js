const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');
const ingredients = require('../data/ingredients');

mongoose.connect('mongodb://127.0.0.1:27017/pizzeria')
  .then(async () => {
    console.log('MongoDB connected');

    await Ingredient.deleteMany();   // clear old data
    await Ingredient.insertMany(ingredients);

    console.log('🥗 Ingredients seeded successfully');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
