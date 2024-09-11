import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import './styles/index.css';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { VITE_API_URL } from './types/constants.ts';

console.log(import.meta.env, 'VITE_API_URL: ', VITE_API_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
);
