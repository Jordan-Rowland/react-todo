import React from "react";

function TodoItem(props) {

  function handleClickDelete() {
    props.onDelete(props.title)
  }

  function handleClickEdit(e) {
    props.onEdit(props.title, e)
  }

  return(
    <div className="todo-item">
      <h2 onClick={handleClickEdit}>{props.title}</h2>
      <span className="delete-icon" onClick={handleClickDelete}>
        √
      </span>
    </div>
  );
}

export default TodoItem;