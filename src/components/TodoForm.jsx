import { useSelector, useDispatch } from "react-redux";
import { addTodo, handleInputChange} from "../store/todoSlice";
import classNames from "classnames";

const TodoForm = () => {
  const dispatch = useDispatch();
  const {text, addFormErr} = useSelector(state => state.todos.todos);
  
  const inputClasses = classNames(
    "w-full py-5 text-lg pr-7 pl-11 rounded-bl-md rounded-br-md placeholder:text-gray-300",
    { "placeholder:text-red-400 outline-red-500": addFormErr}
  );
  const btnClasses = classNames("plus-btn", {"empty-field": addFormErr});
  const placeholderText = addFormErr
    ? "The field can't be empty"
    : "Create a new task";

  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTodo());
  }

  return (
    <form 
      className="relative flex items-center" 
      onSubmit={(e) => handleSubmit(e)}
    >
      <button className={btnClasses}></button>
      <input
        type="text"
        className={inputClasses}
        placeholder={placeholderText}
        onChange={(e) => dispatch(handleInputChange(e.target.value))}
        value={text}
      />
    </form>
  );
};

export default TodoForm;
