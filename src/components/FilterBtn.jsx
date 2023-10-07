import { useSelector, useDispatch } from "react-redux";
import { handleFilterChange, filterTodos } from "../store/todoSlice";
import classNames from "classnames";

const FilterBtn = ({ name }) => {
  const { activeFilter } = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const filterBtnsClasses = classNames("underline transition", {
    "text-amber-600": activeFilter === name,
    "text-slate-600": activeFilter !== name,
  });

  const toggleActiveFilter = (filter) => {
    dispatch(handleFilterChange({ filter}));
    dispatch(filterTodos());
  }

  return (
    <button
      className={filterBtnsClasses}
      onClick={() => toggleActiveFilter(name)}
    >
      {name}
    </button>
  );
};

export default FilterBtn;
