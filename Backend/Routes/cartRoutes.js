const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

/**
 * SAVE / UPDATE CART
 */
router.post('/cart', async (req, res) => {
  try {
    const cartData = req.body;

    // remove old cart (single-cart app)
    await Cart.deleteMany();

    const cart = new Cart(cartData);
    await cart.save();

    res.json({ message: 'Cart saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET CART
 */
router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne().sort({ createdAt: -1 });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * CLEAR CART
 */
router.delete('/cart', async (req, res) => {
  await Cart.deleteMany();
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
