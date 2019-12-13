import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { SourcesState } from './sources/types';
import { sourcesReducer } from './sources/reducer';
import { FeedsState } from './feeds/types';
import { feedsReducer } from './feeds/reducer';
import sourcesSaga from './sources/sagas';

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

export function* rootSaga() {
  yield all([sourcesSaga()])
}
