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
    const todoInputTrimmed = todoInput.trim()
    if (e.key === "Enter" && todoInputTrimmed) {
      if (!editedTodoInput) {
        setTodos(prevTodos => {
          setTodoStorage([...prevTodos, todoInputTrimmed])
          return [...prevTodos, todoInputTrimmed]
        })
        setTodoInput("");
      } else {
        const updatedTodos = [...todos]
        updatedTodos[updatedTodoIndex] = todoInputTrimmed
        setTodos(updatedTodos)
        setTodoStorage(updatedTodos)
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
    const todoTextTrimmed = todoText.trim()
    setTodoInput(todoTextTrimmed)
    setEditedTodoInput(todoTextTrimmed)
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