export interface Task {
  name: string;
  id: string;
  completed: boolean;
}

export interface TodoProps extends Task {
  toggleTaskCompleted: (id: string) => void;
  editTask: (id: string, newName: string) => void;
  deleteTask: (id: string) => void;
}

export type Filter = "All" | "Active" | "Completed";

export interface FilterButtonProps {
  name: Filter;
  toggleFilter: (filterName: Filter) => void;
}
