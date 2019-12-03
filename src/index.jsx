/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as idb from 'idb';

import rootReducer from './reducers';
import './index.css';
import App from './components/App/App';
import { loadSources } from './actions/sources';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    isAuthorized: false,
    user: {
      guest: {

      },
    },
    sources: {
      selectedSourceId: null,
      items: [],
    },
    feeds: {
      isFetching: false,
      feedsByUrl: {},
    },
  },
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

const initApp = async () => {
  await idb.openDB('clientDatabase', 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      db.createObjectStore('users', { autoIncrement: true });
      db.createObjectStore('sources', { autoIncrement: true });
    },
  });

  store.dispatch(loadSources());
};

initApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
