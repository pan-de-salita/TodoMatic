import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { Filter, Task } from "./types";
import useLocalStorage from "./custom-hooks/useLocalStorage";
import FilterButton from "./components/FilterButton";
import { useEffect, useRef, useState } from "react";
import { FILTER_MAP, FILTERS } from "./globals";
import usePrevious from "./custom-hooks/usePrevious";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<Filter>("All");
  const listHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const previousTasksLength = usePrevious(tasks.length);

  const taskList = tasks
    .filter((task) => FILTER_MAP[filter](task))
    .map((task) => (
      <Todo
        key={task.id}
        name={task.name}
        id={task.id}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    ));
  const filterList = FILTERS.map((filter) => (
    <FilterButton name={filter} toggleFilter={toggleFilter} key={filter} />
  ));
  const taskNoun = taskList.length === 1 ? "task" : "tasks";
  const taskVerb = filter === "All" ? "in total" : filter.toLowerCase();
  const taskHeader = `${taskList.length} ${taskNoun} ${taskVerb}`;

  function addTask(taskName: string) {
    if (!!taskName.length) {
      setTasks((prevTasks: Task[]) => [
        ...prevTasks,
        {
          name: taskName,
          id: nanoid(),
          completed: false,
        },
      ]);
    }
  }

  function toggleTaskCompleted(id: string) {
    setTasks((prevTasks) =>
      [...prevTasks].map((task) => {
        if (task.id === id) {
          const pastCompleted = task.completed;
          return { ...task, completed: !pastCompleted };
        }

        return task;
      }),
    );
  }

  function editTask(id: string, newTaskName: string) {
    setTasks((prevTasks) =>
      [...prevTasks].map((task) => {
        if (task.id === id) {
          return { ...task, name: newTaskName };
        }

        return task;
      }),
    );
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function toggleFilter(filterName: Filter) {
    setFilter(filterName);
  }

  useEffect(() => {
    if (!!previousTasksLength && tasks.length < previousTasksLength) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, previousTasksLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" ref={listHeadingRef} tabIndex={-1}>
        {taskHeader}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
