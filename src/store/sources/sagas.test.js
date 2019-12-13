import { put, call } from 'redux-saga/effects';

import { db } from '../../utils/api';
import { SourcesActions } from './types';
import { getRssTitle, addSource } from './sagas';
import * as actions from './actions';

describe('Test addSource Saga.', () => {
  const mockUrl = 'https://news.tut.by/rss/index.rss';
  const mockTitle = 'Test title';
  const mockUserId = 0;
  const mockSourceId = 0;

  const mockAction = {
    type: SourcesActions.ADD_SOURCE_REQUESTED,
    url: mockUrl,
  };

  let iterator = addSource(mockAction);

  test('Fetch rss title.', () => {
    const rssFetchEffect = call(getRssTitle, mockUrl);
    expect(iterator.next().value).toEqual(rssFetchEffect);
  });

  test('Add Source to the database.', () => {
    const dbAddEffect = call(db.create, 'sources', {
      title: mockTitle,
      url: mockUrl,
      userId: mockUserId,
    });

    expect(iterator.next(mockTitle).value).toEqual(dbAddEffect);
  });

  test('Add Source to the state.', () => {
    expect(iterator.next(mockSourceId).value).toEqual(
      put(actions.addSourceSucceeded({
        id: mockSourceId,
        userId: mockUserId,
        title: mockTitle,
        url: mockUrl,
      })),
    );
  });

  test('Close dialog.', () => {
    expect(iterator.next().value).toEqual(put(actions.toggleSourceAddDialog()));
  });

  iterator = addSource(mockAction);

  test('Show error on fail.', () => {
    const errorMessage = 'Test';
    expect(
      iterator.throw(new Error(errorMessage)).value,
    ).toEqual(
      put(actions.addSourceFailed(errorMessage)),
    );
  });
});
