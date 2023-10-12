//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app=express();
// app.set("view-engine")
app.use(express.static("public"));
let items=[];

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB",{useNewURLParser:true});
//schema todolist

const itemsSchema = mongoose.Schema({
     name: String
})

const Item =mongoose.model("Item", itemsSchema);

// const item1= new Item({
// name:"welcome"
// });
// const item2= new Item({
//     name:"hello"
//     });
//     const item3= new Item({
//         name:"back"
//         });
const defalutArray=[];

// Item.insertMany(defalutArray);




let time=new Date();
const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
    
  };
  var t=time.toLocaleDateString("en-US",options)

app.get("/",(req,res)=>{
    Item.find()
.then(function(items){
    if(items.length==0){
        Item.insertMany(defalutArray);
    }

       res.render("list.ejs",
    {day:t, itmesElements:items});  
})
.catch(function(err){
    console.log(err);
})
  
    
});

app.post("/",(req,res)=>{
    var item=req.body.list;
    if(item!==""){
        const itemz= new Item({
            name:item
            });
            itemz.save();
    }
    
    res.redirect("/");
})

app.post("/delete",(req,res)=>{
    Item.findByIdAndRemove(req.body.check)
    .then(function(){
        console.log("successfully deleted");
    })
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("server is listining at port 3000");
});