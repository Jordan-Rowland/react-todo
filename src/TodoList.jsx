import React, { useState } from "react";
import TodoItem from "./TodoItem.jsx";


function TodoList() {
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState(["Clean the groceries", "Eat the dog"])

  function handleChange(e) {
    setTodoInput(e.target.value);
  }

  function checkSubmit(e) {
    if (e.key === "Enter") {
      setTodos(prevTodos => [...prevTodos, todoInput])
      setTodoInput("");
    }
  }

  function removeTodo(todoText) {
    setTodos(prevTodos => prevTodos.filter(todo => todo !== todoText))
  }

  const todoItems = todos.map(todo => {
    return (
      <TodoItem
        key={todo}
        title={todo}
        deleteTodo={removeTodo}
      />
    )
  })

  return(
    <div className="todo-container">
      <input
        className="todo-input"
        type="text"
        onChange={handleChange}
        onKeyDown={checkSubmit}
        value={todoInput}
      />
      {todoItems}
    </div>
  );
}

export default TodoList;