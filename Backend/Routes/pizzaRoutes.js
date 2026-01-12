const express = require('express');
const router = express.Router();
const pizza=require('../data/pizzaa');

router.get('/pizzas',(req,res)=>{
    console.log("Pizza API Hit");
    res.json(pizza);
});

module.exports=router;