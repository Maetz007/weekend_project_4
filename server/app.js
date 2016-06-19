var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: false } );
var pg = require("pg");
var connectionString = 'postgres://localhost:5432/weekFourDatabase';


app.listen(process.env.PORT || 8675, function() {console.log("Listening on port 8675"); });

app.use(express.static("public"));

app.get("/", function(req, res){
  console.log("You Are in L");
  res.sendFile( path.resolve ("views/index.html") );
}); // end URL app.get

//-------------------------------------------------------------------------------------------------------------------

app.post("/addTaskDatabase", urlencodedParser, function(req, res){
  pg.connect( connectionString, function( err, client, done ){
    client.query("INSERT INTO tasks (taskname, complete) VALUES ($1, $2)", [req.body.taskObj, req.body.completeObj]);
  }); // end pg.connect
  res.send("res success");
}); // end /addTaskDatabase

//-------------------------------------------------------------------------------------------------------------------

app.get("/getAllTasks", function(req, res){
  var dataResult = [];
  pg.connect( connectionString, function(err, client, done){
    var callData = client.query("SELECT * FROM tasks ORDER BY complete, false DESC;");
    callData.on('row', function(row){
      dataResult.push(row);
    });
    callData.on('end', function (){
      return res.json(dataResult);
    }); // end callData
  }); // end connect
}); // end app.get /getUsers

//-------------------------------------------------------------------------------------------------------------------

app.post("/deleteTask", urlencodedParser, function(req, res){
  pg.connect( connectionString, function( err, client, done ){
    client.query("DELETE FROM tasks WHERE id = ($1)", [req.body.id]);
  }); // end pg.connect
  res.send("res success");
}); // end /deleteTask

//-------------------------------------------------------------------------------------------------------------------

app.post("/completeTask", urlencodedParser, function(req, res){
  pg.connect( connectionString, function( err, client, done ){
    client.query("UPDATE tasks SET complete = ($1) WHERE id = ($2)", [req.body.objCompleteBool, req.body.objCompleteId]);
  }); // end pg.connect
  res.send("res success");
}); // end /completeTask
