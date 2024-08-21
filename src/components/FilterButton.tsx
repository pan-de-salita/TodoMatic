import { FilterButtonProps } from "../types";

function FilterButton({ name, toggleFilter }: FilterButtonProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed="true"
      onClick={() => toggleFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
