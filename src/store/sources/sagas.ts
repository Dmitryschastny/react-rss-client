import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { SourcesActions } from './types';
import { addSourceSucceeded, addSourceFailed, toggleSourceAddDialog } from "./actions";
import { getFeed } from '../../utils/api';
import { db } from '../../utils/api';

export async function getRssTitle(url: string): Promise<string> {
  const rss = await getFeed(url);
  if (!rss) {
    throw new Error('Error occured while parsing RSS, try a new one.');
  } else {
    return rss.title;
  }
}

export function* addSource(action: any) {
  try {
    const title = yield call(getRssTitle, action.url);
    const userId = 0;
    const id = yield call(db.create, 'sources', {
      title,
      url: action.url,
      userId,
    });

    yield put(addSourceSucceeded({
      id,
      userId,
      title,
      url: action.url,
    }));
    yield put(toggleSourceAddDialog());
  } catch (error) {
    yield put(addSourceFailed(error.message))
  }
}

function* watchAddSource() {
  // takeEvery allows multiple addSource instances to be started concurrently.
  // At a given moment, we can start a new addSource task while there are still
  // one or more previous addSource tasks which have not yet terminated.
  // yield takeEvery(SourcesActions.ADD_SOURCE_REQUESTED, addSource);

  // takeLatest run only the latest started task
  // If a previous task is still running when another addSource task is started, the previous task will be automatically cancelled.
  yield takeLatest(SourcesActions.ADD_SOURCE_REQUESTED, addSource);
}

export default function* sourcesSaga() {
  yield all([
    watchAddSource()
  ])
}
