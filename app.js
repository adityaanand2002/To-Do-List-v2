const express = require("express");
const bodyParser = require("body-parser");
const dayt = require(__dirname + "/day.js");
const res = require("express/lib/response");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/toDoItemsDB");

const app = express();

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

const def1=new Item({
  name:"Welcome to To-Do List"
});
const def2 = new Item({
  name: "Type and click + to add item",
});
const def3 = new Item({
  name: "Click the left button to delete item",
});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var nday = dayt.getDate();

  Item.find({}, function (err, f) {

    if(f.length==0)
    {
      Item.insertMany([def1,def2,def3]);
      res.redirect("/");
    }
    else{
      res.render("xx", { kindofday: nday, newitems: f });
    }
    
  });
});


app.get("/:title",function(req,res){
  const head=req.params.title;

});

app.post("/", function (req, res) {
  var itemx = new Item({
    name: req.body.itemm,
  });
  itemx.save();
  res.redirect("/");
});
app.post("/delete",function(req,res){
  const delId=req.body.checkbox;
  
  Item.findByIdAndRemove(delId,function(err){
    if(err)
    console.log(err);
  });
  res.redirect("/")
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
