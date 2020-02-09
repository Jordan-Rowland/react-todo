import React from "react";

function TodoItem(props) {

  function dispatchDelete() {
    props.onDelete(props.text)
  }

  function dispatchEdit() {
    props.onEdit(props.text)
  }

  return(
    <div className="todo-item">
      <h2 onClick={dispatchEdit}>{props.text}</h2>
      <span className="delete-icon" onClick={dispatchDelete}>
        √
      </span>
    </div>
  );
}

export default TodoItem;