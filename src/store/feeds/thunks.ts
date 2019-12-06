import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import Service from '../../Service';
import { fetchFeedRequest, fetchFeedSuccess } from './actions';

// async action creator
export const thunkFetchFeed = (url: string) => async (dispatch: Dispatch) => {
  dispatch(fetchFeedRequest());

  const rss = await Service.getFeed(url);

  // if (!rss) {
  //   dispatch(fetchFeedFailure('Error occured while parsing RSS.'));
  // }

  dispatch(fetchFeedSuccess(url, rss.items));
}
