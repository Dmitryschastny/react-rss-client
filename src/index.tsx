import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './store';
import './index.css';
import App from './components/App';
import { loadSourcesRequested } from './store/sources/actions';
import * as serviceWorker from './serviceWorker';
import { db } from './utils/api';
import { ApplicationState } from './store';

const initialState: ApplicationState = {
  // isAuthorized: false,
  // users: { byId: {} },
  sources: {
    byId: {},
    selectedSourceId: null,
    deleteSourceId: null,
    isLoading: false,
    errorMessage: null,
    isAddDialog: false,
    isDeleteDialog: false,
  },
  feeds: {
    isFetching: false,
    feedsByUrl: {},
  },
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, logger, sagaMiddleware),
  )
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

(async () => {
  await db.init();
  store.dispatch<any>(loadSourcesRequested());
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
