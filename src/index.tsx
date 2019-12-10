import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from './store';
import './index.css';
import App from './components/App';
import { thunkLoadSources } from './store/sources/thunks';
import * as serviceWorker from './serviceWorker';
import { db } from './utils/api';
import { ApplicationState } from './store';

const initialState: ApplicationState = {
  // isAuthorized: false,
  // users: { byId: {} },
  sources: {
    byId: {},
    selectedSourceId: null,
  },
  feeds: {
    isFetching: false,
    feedsByUrl: {},
  },
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, logger),
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

(async () => {
  await db.init();
  store.dispatch<any>(thunkLoadSources());
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
