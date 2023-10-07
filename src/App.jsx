import {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterTodos } from "./store/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";

const App = () => {
  const dispatch = useDispatch();
  const {todos} = useSelector(state => state.todos.todos);

  useEffect(() => {
    dispatch(filterTodos());
  }, [todos]);

  const filters = todos.length ? <Filters /> : null;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <section className="relative w-full max-w-xl rounded-md shadow-lg">
        <header className="flex items-center justify-between px-4 py-4 border-b border-dashed ">
          <h1 className="text-2xl font-medium text-slate-700">To-do list</h1>
          {filters}
        </header>
        <TodoList />
        <TodoForm />
      </section>
    </div>
  );
};

export default App;
