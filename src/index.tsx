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
import { loadSourcesRequested, loadSourcesSucceeded } from './store/sources/actions';
import * as serviceWorker from './serviceWorker';
import * as Api from './utils/api';
import { ApplicationState } from './store';
import { loginSucceeded } from './store/user/actions';

const initialState: ApplicationState = {
  user: {
    authError: null,
    isAuthorized: false,
    email: 'Guest',
  },
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
  await Api.db.init();
  store.dispatch<any>(loadSourcesRequested());

  if (Api.isToken()) {
    store.dispatch(loginSucceeded('test'));
  }
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
