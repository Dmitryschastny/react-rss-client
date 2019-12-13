import { call, put, takeEvery, all } from 'redux-saga/effects';

import { SourcesActions } from './types';
import { addSourceSucceeded, addSourceFailed, toggleSourceAddDialog } from "./actions";
import { getFeed } from '../../utils/api';
import { db } from '../../utils/api';

async function checkRssVality(url: string): Promise<string> {
  const rss = await getFeed(url);
  if (!rss) {
    throw new Error('Error occured while parsing RSS, try a new one.');
  } else {
    return rss.title;
  }
}

export function* addSource(action: any) {
  try {
    const title = yield call(checkRssVality, action.url);
    const userId = 0;
    const id = yield call(db.create, 'sources', {
      title: action.title,
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
  yield takeEvery(SourcesActions.ADD_SOURCE_REQUESTED, addSource);
}

export default function* sourcesSaga() {
  yield all([
    watchAddSource()
  ])
}
