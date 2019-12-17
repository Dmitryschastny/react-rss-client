import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { SourcesState } from './sources/types';
import { sourcesReducer } from './sources/reducer';
import { FeedsState } from './feeds/types';
import { feedsReducer } from './feeds/reducer';
import sourcesSaga from './sources/sagas';
import { UserState } from './user/types';
import { userReducer } from './user/reducer';
import userSaga from './user/sagas';

export interface ApplicationState {
  // isAuthorized: boolean;
  // user: {}
  user: UserState;
  sources: SourcesState;
  // feeds are not intended to be stored in the database(in the cache instead),
  // so they can be not-normalized
  feeds: FeedsState;
}

export default combineReducers({
  user: userReducer,
  sources: sourcesReducer,
  feeds: feedsReducer,
});

export function* rootSaga() {
  yield all([sourcesSaga(), userSaga()])
}
