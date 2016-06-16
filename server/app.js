var express = require("express");
var app = express;
var path = require("path");
var pg = require("pg");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: false } );

app.listen(process.env.PORT || 9001, function() {
  console.log("Listening on port 9001... IT'S OVER 9000!!!");
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile( path.resolve("views/index.html"));
});
