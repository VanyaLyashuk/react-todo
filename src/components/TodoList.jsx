import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const {filteredTodos} = useSelector(state => state.todos.todos);
  let todoItems = filteredTodos ? filteredTodos.map(({id, text, editableText, completed, isEditing, editFormErr}) => {
    return (
      <TodoListItem
        key={id}
        id={id}
        text={text}
        editableText={editableText}
        completed={completed}
        isEditing={isEditing}
        editFormErr={editFormErr}
      />
    );
  }) : null;

  return <ul>{todoItems}</ul>;
};

export default TodoList;
