import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { getFeed } from '../../utils/api';
import { fetchFeedRequest, fetchFeedSuccess } from './actions';

export const thunkFetchFeed = (url: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchFeedRequest());

    const rss = await getFeed(url);

    // if (!rss) {
    //   dispatch(fetchFeedFailure('Error occured while parsing RSS.'));
    // }

    dispatch(fetchFeedSuccess(url, rss.items));
  }
);
