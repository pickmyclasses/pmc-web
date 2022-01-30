import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import App from './App.jsx';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

document.body.style['margin'] = 0;
document.body.style['fontFamily'] = 'Roboto, sans-serif';
