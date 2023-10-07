import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    text: "",
    filteredTodos: [],
    activeFilter: "All",
    addFormErr: false,
  },
  reducers: {
    addTodo(state) {
      if (state.text) {
        state.todos.push({
          id: nanoid(),
          text: state.text,
          editableText: state.text,
          editFormErr: false,
          completed: false,
          isEditing: false,
        });
        state.text = "";
        state.addFormErr = false;
      } else {
        state.addFormErr = true; 
      }
    },
    editTodo(state, action) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.text = action.payload.editedText;
        }
      });
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => {
        if (todo.id !== action.payload.id) return todo;
      });
    },
    filterTodos(state) {
      switch(state.activeFilter) {
        case "Todo":
          state.filteredTodos = state.todos.filter(todo => !todo.completed);
          break;
        case "Completed":
          state.filteredTodos = state.todos.filter(todo => todo.completed);
          break;
        default:
          state.filteredTodos = state.todos;
      }
    },
    handleInputChange(state, action) {
      state.text = action.payload;
      if (state.text) {
        state.addFormErr = false;
      } else {
        state.addFormErr = true;
      }
    },
    handleTextareaChange(state, action) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.editableText = action.payload.editedText;
          if (action.payload.editedText === "") todo.editFormErr = true;
          if (action.payload.editedText) todo.editFormErr = false;
        }
      });
    },
    handleChecked(state, action) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
        }
      });
    },
    handleEditing(state, action) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.isEditing = action.payload.visibility;
        }
      });
    },
    handleFilterChange(state, action) {
      state.activeFilter = action.payload.filter;
    },
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  filterTodos,
  handleInputChange,
  handleTextareaChange,
  handleChecked,
  handleEditing,
  handleFilterChange,
} = todoSlice.actions;
export default todoSlice.reducer;
