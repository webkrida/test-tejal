const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/home.html");
});

app.get("/products",function(req,res){
    res.sendFile(__dirname + "/products.html");
});

app.get("/category",function(req,res){
    res.sendFile(__dirname + "/category.html");
});

app.listen(port,function(){
    console.log("server is running on port "+port);
});