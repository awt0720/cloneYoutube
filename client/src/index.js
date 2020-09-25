import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleWare from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers';


const store = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore,)

ReactDOM.render(
  <Provider store={store(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>,
  document.getElementById('root')
);
