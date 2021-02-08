import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { UserProvider } from "./context/UserProvider";
import { ContextProvider } from "./context/newsContext";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);