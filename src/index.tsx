import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './store';
import './index.css';
import App from './components/App/App';
// import { loadSources } from './actions/sources';
import * as serviceWorker from './serviceWorker';
import Service from './Service';
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
    applyMiddleware(
      thunkMiddleware,
      (store) => (next) => (action) => {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
      }),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

(async () => {
  await Service.init();
  // store.dispatch(loadSources());
})()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
