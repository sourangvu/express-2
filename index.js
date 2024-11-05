const express = require("express")
const app = express();

const port = 3000;

app.use(express.json());

const todos = [];
let id = 1;

app.get("/", (request, response) => {
  response.send(todos);
});

app.post("/", (request, response) => {
  const { title } = request.body;
  const todo = { _id: id++, title };

  todos.push(todo);

  response.send(todo);
});

app.put("/:id", (request, response) => {
  const { urlId } = parseInt(request.params);
  const { title } = request.body;
  const targetTodo = todos.find((todo) => todo.id === urlId);
  if (targetTodo) {
    targetTodo.title = title;
    response.send(targetTodo);
  } else {
    response.send("Item not found");
  }
});

app.delete("/:id", (request, response) => {
  const { urlId } = parseInt(request.params);
  const deleteTodo = todos.findIndex((todo) => todo.id === urlId);

  todos.splice(deleteTodo, 1);
  response.send("Item deleted");
});

app.listen(port, () => console.log("Server running on port 3000 ", port));
