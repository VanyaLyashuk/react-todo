import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

const todoList = [];
const filters = [
  {name: 'All', isActive: true},
  {name: 'Todo', isActive: false},
  {name:'Completed', isActive: false}
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App todoList={todoList} filters={filters}/>
    </Provider>
  </React.StrictMode>,
)
