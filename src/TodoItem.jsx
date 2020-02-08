import React from "react";

function TodoItem(props) {
  return(
    <div className="todo-item">
      <h2>{props.title}</h2>
      <span className="delete-icon" onClick={() => props.deleteTodo(props.title)}>
        X
      </span>
    </div>
  );
}

export default TodoItem;