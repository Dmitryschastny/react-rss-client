import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux';

import { SourcesState } from './sources/types';
import { sourcesReducer } from './sources/reducer';
import { FeedsState } from './feeds/types';
import { feedsReducer } from './feeds/reducer';
// const exampleStore: Store = {
//   isAuthorized: false,
//   users: {
//     byId: {
//       1: {
//         id: 1,
//         username: 'guest',
//         password: '',
//       },
//       2: {
//         id: 1,
//         username: '',
//         password: '',
//       },
//     },
//   },
//   selectedSourceId: null,
//   sources: {
//     byId: {
//       1: {
//         id: 1,
//         userId: 1,
//         url: 'https://test',
//         title: 'test',
//       },
//     },
//   },
//   feeds: {
//     isFetching: false,
//     feedsByUrl: {},
//   },
// };

export interface ApplicationState {
  // isAuthorized: boolean;
  // user: {}
  sources: SourcesState;
  // feeds are not intended to be stored in the database(in the cache instead),
  // so they can be not-normalized
  feeds: FeedsState;
}

export default combineReducers({
  sources: sourcesReducer,
  feeds: feedsReducer,
});
