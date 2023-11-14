import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootDomNode = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootDomNode);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
