'use strict';
const axios=require('axios');
const {coffeeModel}=require('../models/coffee.model');

// Endpoint for testing
const home=(req,res)=>{
// provide your logic here
res.send('hello m3lem')
}
// Call the coffee api here and return the results
const retreiveItemsController=async(req,res)=>{
    // provide your logic here
    const url=`https://coffeepedias.herokuapp.com/coffee-list`;
    axios.get(url).then(result=>{
        const data=result.data.map(item=>{
            return new api(item)
        })
        res.send(data);
    })
};

class api{
    constructor(item){
        this.title=item.title;
        this.description=item.description;
        this.ingredients=item.ingredients;
        this.img=item.image_url;
        this.id=item.id
    }
}
// Get favorite coffee from MongoDB
const getFavoriteCoffee=(req,res)=>{
    // provide your logic here
    // const obj=coffeeSeed();
    // res.send(obj)

    coffeeModel.find({},(err,data)=>{
        res.send(data)
    })

}
// // Create new fav coffee endpoint
const createItemController=(req,res)=>{
    // provide logic here

    const {title,description,ingredients,img,id}=req.body;
    const newFav=new coffeeModel({
        title:title,
        description:description,
        ingredients:ingredients,
        img:img,
        id:id,
    })
    newFav.save();
    res.send(newFav)
};

// // update coffee from MongoDB
const updateItemController=(req,res)=>{
    // provide logic here
    
    const {title,description,ingredients,img,id}=req.body;
    coffeeModel.findOne({id:id},(err,data)=>{
        data.title=title;
        data.description=description;
        data.ingredients=ingredients;
        data.img=img;
        data.id=id;
        data.save();
        res.send(data)
    })


};

// // delete coffee from MongoDB
const deleteItemController=(req,res)=>{
    // provide your logic here

    const id=req.params.id;
    coffeeModel.remove({id:id},(err,data)=>{
        coffeeModel.find({},(err,data)=>{
            res.send(data)
        })
    })
};

module.exports={
    home,
    retreiveItemsController,
    createItemController,
updateItemController,
deleteItemController,
retreiveItemsController,
getFavoriteCoffee
};


