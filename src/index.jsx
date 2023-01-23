import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {LoginProvider} from './context/Authentication'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LoginProvider>
    <App />
    </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
