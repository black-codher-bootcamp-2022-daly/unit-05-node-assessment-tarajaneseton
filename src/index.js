require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const todoFilePath = process.env.BASE_JSON_PATH;
const getData = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname, todoFilePath)));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());

app.use("/content", express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile("./public/index.html", { root: __dirname }, (err) => {
    console.log(err);
  });
  // res.end();
});

//Add GET request with path '/todos to return todos from todos.json file

app.get("/todos", (_, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(todoFilePath, { root: __dirname });
  res.status(200);
});

//Add GET request with path '/todos/overdue'.
// Return a list of overdue todos, else if no overdue todos an empty list (array). Todos can be filtered based on due date

app.get("/todos/overdue", (req, res) => {
  res.header("Content-Type", "application/json");
  let todos = getData().filter(
    (todo) => !todo.completed && Date.parse(todo.due) < new Date()
  );
  res.send(todos);
});

//Add GET request with path '/todos/completed'
app.get("/todos/completed", (req, res) => {
  res.header("Content-Type", "application/json");
  let todos = getData().filter((todo) => todo.completed);
  res.send(todos);
});
//Add POST request with path '/todos'
app.post("/todos", function (req, res) {
  var newTask = req.body.newtask;
  //add the new task from the post route
  task.push(newTask);
  res.redirect("/");
});

//Add PATCH request with path '/todos/:id
// Return a specific todo with the corresponding id
app.patch("/todos/:id", (req, res) => {
  findElementById(req.params.id, res).name = req.body.name;
  console.log(findElementById);
  if (req.body.due) {
    item.due = req.body.due;
  }
  checkIfUpdateSuccessful(res);
});

//Add POST request with path '/todos/:id/complete

app.post("/todos/:id/complete", (req, res) => {

  findElementById(req.params.id, res).completed = true;

  checkIfUpdateSuccessful(res, 200, 404);

});

//Add POST request with path '/todos/:id/undo

//Add DELETE request with path '/todos/:id

module.exports = app;
