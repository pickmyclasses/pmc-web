import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import App from './App.jsx';
import './index.css';
import { SnackbarProvider } from 'notistack';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

document.title = 'PickMyClasses';

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>,
  document.getElementById('root')
);
