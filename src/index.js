import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StudentProvider } from './Context/StudentContext';
import { LoginProvider } from './Context/LoginContext';
import { Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <StudentProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </StudentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
