const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

var db = require ("./database");

const ENV = process.env.Node_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/api/cities",require("./api/cities"))
app.use("/api/weather",require("./api/weather"))

if (ENV === "production"){
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", res=>{
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
  })
}

app.listen(PORT, () => {
 console.log('console listening on port ',PORT);
});

db.query("SELECT NOW()",(err,res)=>{
    if (err.error)
      return console.log(err,error);
    console.log("pg connected:",res[0].now)
});

module.exports = app;