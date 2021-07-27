'use strict';
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT;
const {
    home,
    getFavoriteCoffee,
createItemController,
updateItemController,
deleteItemController,
    retreiveItemsController
}=require('./controllers/coffee.controller');


mongoose.connect(`mongodb://127.0.0.1:27017/finalexam`, 
                {useNewUrlParser: true, useUnifiedTopology:true});

app.get('/',home);
app.get('/retreive',retreiveItemsController);
app.get('/fav-list',getFavoriteCoffee);
app.post('/create',createItemController);
app.put('/update/:id',updateItemController);
app.delete('/delete/:id',deleteItemController);

app.listen(PORT, ()=>{
    console.log('listening to port 8000');
});