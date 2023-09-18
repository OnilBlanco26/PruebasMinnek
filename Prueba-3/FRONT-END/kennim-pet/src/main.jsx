import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import DogsApp from './DogsApp';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <DogsApp />
    
  </React.StrictMode>
);
