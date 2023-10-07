import { useDispatch } from "react-redux";
import {
  editTodo,
  deleteTodo,
  handleChecked,
  handleEditing,
  handleTextareaChange,
} from "../store/todoSlice";
import classNames from "classnames";

const TodoListItem = ({
  id,
  text,
  completed,
  isEditing,
  editableText,
  editFormErr,
}) => {
  const dispatch = useDispatch();

  const checkBoxClasses = classNames(
    "block w-[20px] h-[20px] border rounded-full transition flex-shrink-0 mt-[5px]",
    { checked: completed }
  );
  const textClasses = classNames(
    "text-lg transition w-full break-all text-slate-600",
    { "line-through": completed }
  );
  const editFormClasses = classNames(
    "flex flex-col items-end w-full pl-[26px] pt-3",
    { hidden: !isEditing }
  );

  const txtareaClasses = classNames(
    "w-full px-4 py-2 mb-2 overflow-hidden border border-dashed rounded-md resize-none text-slate-600",
    { "border-red-500 outline-red-500 placeholder:text-red-400": editFormErr }
  );

  const handleSubmit = (e, id, editedText = "") => {
    e.preventDefault();

    if (editedText) {
      dispatch(editTodo({ id, editedText }));
      toggleFormVisibility(e, id, false);
    }
  };

  const toggleFormVisibility = (e, id, visibility) => {
    e.preventDefault();
    dispatch(handleEditing({ id, visibility }));
  };

  return (
    <li className="flex flex-wrap justify-between px-4 py-5 border-b border-dotted">
      <div className="flex items-start justify-between w-full">
        <label
          htmlFor={id}
          className="flex items-start gap-2 cursor-pointer w-full max-w-[calc(100%-60px)]"
        >
          <input
            type="checkbox"
            id={id}
            onChange={() => dispatch(handleChecked({ id }))}
            checked={completed}
            className="hidden"
          />
          <span className={checkBoxClasses}></span>
          <span className={textClasses}>{text}</span>
        </label>
        <div className="flex items-center gap-2 mt-[5px]">
          <button onClick={(e) => toggleFormVisibility(e, id, true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 transition hover:text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button onClick={() => dispatch(deleteTodo({ id }))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 transition hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <form
        className={editFormClasses}
        onSubmit={(e) => handleSubmit(e, id, editableText)}
      >
        <textarea
          type="textarea"
          value={editableText}
          onChange={(e) =>
            dispatch(handleTextareaChange({ editedText: e.target.value, id }))
          }
          placeholder="The field can't be empty"
          className={txtareaClasses}
        ></textarea>
        <div className="flex gap-2">
          <button
            onClick={(e) => toggleFormVisibility(e, id, false)}
            className="px-3 py-1 text-sm border rounded-md cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-sm border rounded-md confirm-btn"
          >
            Confirm
          </button>
        </div>
      </form>
    </li>
  );
};

export default TodoListItem;
