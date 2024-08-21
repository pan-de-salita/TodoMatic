import { useState } from "react";

interface FormProps {
  addTask: (taskName: string) => void;
}

function Form({ addTask }: FormProps) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!!taskName.length) {
      addTask(taskName);
      setTaskName("");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={taskName}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
