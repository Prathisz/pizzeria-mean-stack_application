const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/pizzeria')
.then(()=>{console.log("MongoDb connected")})
.catch((err)=>{console.log(err)});

const port=5000;
app.get('/',async(req,res)=>{
    res.send("Api is running");
});

const ingredientsroute=require('./Routes/IngredientRoutes');
app.use('/api',ingredientsroute);

const pizzaroute=require('./Routes/pizzaRoutes');
app.use('/api',pizzaroute);

const cartRoutes = require('./Routes/cartRoutes');
app.use('/api', cartRoutes);


app.listen(port,()=>{
    console.log(`Server in running http://localhost:5000`);
});