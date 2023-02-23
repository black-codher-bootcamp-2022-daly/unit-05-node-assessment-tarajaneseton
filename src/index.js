require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const todoFilePath = process.env.BASE_JSON_PATH;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => { 
  res.sendFile("./public/index.html", { root: __dirname }, (err) =>{
    console.log(err);
});
  // res.end();
});

//Add GET request with path '/todos to return todos from todos.json file

app.get('/todos', (_, res) => {
  // res.statusCode = 200
  res.header("Content-Type","application/json");
  res.sendFile(todoFilePath, { root: __dirname });
  res.status(200);
  // res.status(501).end();
});

//Add GET request with path '/todos/overdue'. 
// Return a list of overdue todos, else if no overdue todos an empty list (array). Todos can be filtered based on due date

// const currentDate = new Date();

// app.get('todos/overdue', function(req, res, next){
//   if (req.params.date < currentDate) {
//     res.send
//   }
// })
// app.get('todos/overdue', (req, res) => {
//   const date = new Date
//   res.header("Content-Type","application/json");
//   res.sendFile(todoFilePath, { root: __dirname });
// } )

//Add GET request with path '/todos/completed'

//Add POST request with path '/todos'
app.post('/todos', function(req, res) {
  var newTask = req.body.newtask;
  //add the new task from the post route
  task.push(newTask);
  res.redirect("/");
});

//Add PATCH request with path '/todos/:id

//Add POST request with path '/todos/:id/complete

//Add POST request with path '/todos/:id/undo

//Add DELETE request with path '/todos/:id

module.exports = app;
