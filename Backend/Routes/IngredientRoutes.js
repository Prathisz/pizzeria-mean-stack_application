const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

router.get('/ing', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
});

module.exports = router;
