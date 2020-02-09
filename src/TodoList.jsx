import React, { useState, useRef } from "react";
import TodoItem from "./TodoItem.jsx";


function TodoList() {
  const [todoInput, setTodoInput] = useState("")
  const [editedTodoInput, setEditedTodoInput] = useState("")

  const todosLS = localStorage.getItem('todos')
  const [todos, setTodos] = useState(typeof todosLS === 'string' ? todosLS.split("|") : [])
  const textInputRef = useRef(null);

  function localeSave(items) {
    if (items.length) {
      localStorage.setItem('todos', items.join("|"));
    }
  }

  function handleChange(e) {
    setTodoInput(e.target.value);
  }

  function submitTodo(e) {
    const updatedTodoIndex = todos.findIndex(text => text === editedTodoInput)
    if (e.key === "Enter" && todoInput) {
      if (!editedTodoInput) {
        setTodos(prevTodos => {
          localeSave([...prevTodos, todoInput])
          return [...prevTodos, todoInput]
        })
        setTodoInput("");
      } else {
        const updatedTodos = [...todos]
        updatedTodos[updatedTodoIndex] = todoInput
        setTodos(updatedTodos)
        setTodos(prevTodos => {
          if (updatedTodos) {
            localeSave(updatedTodos)
          }
          return updatedTodos
        })
        setTodoInput("")
        setEditedTodoInput("")
      }
    }
  }

  function deleteTodo(todoText) {
    let filtered = [];
    setTodos(prevTodos => {
      filtered = prevTodos.filter(todo => todo !== todoText)
      localeSave(filtered)
      return filtered;
      })
      console.log(filtered);
      if (!filtered.length) {
        localStorage.clear();
      }
    }

  function editTodo(todoText) {
    setTodoInput(todoText)
    setEditedTodoInput(todoText)
    textInputRef.current.focus()
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
        ref={textInputRef}
      />
      {todoItems}
    </div>
  );
}

export default TodoList;