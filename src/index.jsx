/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { addSource } from './actions';

import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const mockStore = {
  sources: [
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
  ],
  selectedSourceId: null,
};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// store.dispatch(addSource('test', 'test'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
