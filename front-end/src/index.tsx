import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import AuthStateApp from './components/AuthStateApp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

const store = createStore( reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <AuthStateApp />
  </Provider>,
  document.getElementById('root')
);

