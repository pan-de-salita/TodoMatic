import { useEffect, useRef, useState } from "react";
import { TodoProps } from "../types";
import usePrevious from "../custom-hooks/usePrevious";

function Todo({
  name,
  id,
  completed,
  toggleTaskCompleted,
  editTask,
  deleteTask,
}: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const editButtonRef = useRef<HTMLButtonElement | null>(null);
  const editFieldRef = useRef<HTMLInputElement | null>(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!!newTaskName.length) {
      editTask(id, newTaskName);
      setNewTaskName("");
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [wasEditing, isEditing]);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newTaskName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setIsEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setIsEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
