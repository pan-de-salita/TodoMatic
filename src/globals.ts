import { Filter, Task } from "./types";

export const FILTER_MAP = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed,
};

export const FILTERS = Object.keys(FILTER_MAP) as Filter[];
