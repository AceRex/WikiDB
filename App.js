const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/WikiDB");

app.set("view engine", "ejs");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticle) {
          if (!err) {
            res.send(foundArticle);
          } else {
            res.send(err);
          }
        });
      })
      .post(function (req, res) {
        const newArticle = new Article({
          title: req.body.title,
          content: req.body.content,
        });
        newArticle.save(function(err){
          if(!err){
              res.send("New Article Added")
          } else {
              res.send(err)
          }
        });
      })
      .delete(function (req, res) {
         
          Article.deleteMany(function(err){
              if(!err){
                  res.send("Successfully Deleted all Articles")
              } else {
                  res.send(err)
              }
          })
      
        });


app.listen("7007", function () {
  console.log("Server is running correctly");
});
