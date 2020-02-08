import React, { useState } from "react";
import TodoItem from "./TodoItem.jsx";


function TodoList() {
  const [todoInput, setTodoInput] = useState("")
  const [editedTodoInput, setEditedTodoInput] = useState("")
  const [todos, setTodos] = useState([])

  // if (localStorage.getItem('todos') !== null) {
  //   setTodos(localStorage.getItem('todos').split(","));
  //   console.log(localStorage.getItem('todos'));
  // }


  function handleChange(e) {
    setTodoInput(e.target.value);
  }

  function submitTodo(e) {
    const updatedTodoIndex = todos.findIndex(text => text === editedTodoInput)
    if (e.key === "Enter" && todoInput) {
      if (!editedTodoInput) {
        setTodos(prevTodos => [...prevTodos, todoInput])
        setTodoInput("");
        // localStorage.setItem('todos', [todoInput])
      } else {
        const updatedTodos = [...todos]
        updatedTodos[updatedTodoIndex] = todoInput
        setTodos(prevState => updatedTodos)
        setTodoInput("")
        setEditedTodoInput("")
      }
    }
  }

  function deleteTodo(todoText) {
    setTodos(prevTodos => prevTodos.filter(todo => todo !== todoText))
  }

  function editTodo(todoText) {
    setTodoInput(todoText)
    setEditedTodoInput(todoText)
  }

  const todoItems = todos.map(todo => {
    return (
      <TodoItem
        key={todo}
        title={todo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    )
  })

  return(
    <div className="todo-container">
      <input
        className="todo-input"
        type="text"
        onChange={handleChange}
        onKeyDown={submitTodo}
        value={todoInput}
      />
      {todoItems}
    </div>
  );
}

export default TodoList;