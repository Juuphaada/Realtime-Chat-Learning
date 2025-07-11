import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider> 
        <App />
        {/*now <App/> become a {children} in AuthContext.jsx*/}
      </AuthContextProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);
