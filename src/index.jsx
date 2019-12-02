/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const mockSources = [
  {
    id: 0,
    title: 'tut by',
    url: 'https://news.tut.by/rss/index.rss',
  },
  {
    id: 1,
    title: 'nasa',
    url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
  },
  {
    id: 2,
    title: 'Yandex auto',
    url: 'https://news.yandex.ru/auto.rss',
  },
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    sources: {
      selectedSourceId: null,
      items: mockSources,
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
