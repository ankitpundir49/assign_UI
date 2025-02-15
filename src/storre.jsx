import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';


import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './basketballMatchScore/store/reducer'; 
import MainView from './assignment/main';

// Create the Redux store
const store = configureStore({
  reducer: {
    data:dataReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MainView/>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
