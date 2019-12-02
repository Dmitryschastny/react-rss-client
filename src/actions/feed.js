import Service from '../Service';
import { FETCH_FEED_REQUEST, FETCH_FEED_FAILURE, FETCH_FEED_SUCCESS } from './types';

export const fetchFeedRequest = (() => ({
  type: FETCH_FEED_REQUEST,
}));

export const fetchFeedFailure = ((url, error) => {

  return {
    type: FETCH_FEED_FAILURE,
    url,
  };
});

export const fetchFeedSuccess = ((url, items) => ({
  type: FETCH_FEED_SUCCESS,
  url,
  items,
}));

// async action creator
export const fetchFeed = (url) => {
  return async function (dispatch) {
    dispatch(fetchFeedRequest(url));

    const rss = await Service.getFeed(url);

    // if (!rss) {
    //   dispatch(fetchFeedFailure('Error occured while parsing RSS.'));
    // }

    dispatch(fetchFeedSuccess(url, rss.items));
  };
};
