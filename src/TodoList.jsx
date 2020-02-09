import React, { useState, useRef } from "react";
import TodoItem from "./TodoItem.jsx";
import useInput from "./hooks/useInput.js";
import useStorage from "./hooks/useStorage.js";


function TodoList() {
  const [ editedTodoInput, setEditedTodoInput ] = useState("");
  const textInputRef = useRef(null);

  const [ todoInput, setTodoInput, handleTodoInputChange ] = useInput("");
  const [ todoStorage, setTodoStorage ] = useStorage("todos")
  const todosLS = todoStorage();

  const [ todos, setTodos ] = useState(todosLS);


  function submitTodo(e) {
    const updatedTodoIndex = todos.findIndex(text => text === editedTodoInput)
    if (e.key === "Enter" && todoInput) {
      if (!editedTodoInput) {
        setTodos(prevTodos => {
          setTodoStorage([...prevTodos, todoInput])
          return [...prevTodos, todoInput]
        })
        setTodoInput("");
      } else {
        const updatedTodos = [...todos]
        updatedTodos[updatedTodoIndex] = todoInput
        setTodos(updatedTodos)
        setTodos(prevTodos => {
          if (updatedTodos) {
            setTodoStorage(updatedTodos)
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
      setTodoStorage(filtered)
      return filtered;
      })
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
        text={todo}
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
        onChange={handleTodoInputChange}
        onKeyDown={submitTodo}
        value={todoInput}
        ref={textInputRef}
      />
      {todoItems}
    </div>
  );
}

export default TodoList;