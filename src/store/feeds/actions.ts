import Service from '../../Service';
import { FETCH_FEED_REQUEST, FETCH_FEED_FAILURE, FETCH_FEED_SUCCESS } from './types';

export const fetchFeedRequest = () => ({
  type: FETCH_FEED_REQUEST,
});

// export const fetchFeedFailure = (url: string, error: string) => ({
//   type: FETCH_FEED_FAILURE,
//   url,
// });

export const fetchFeedSuccess = (url: string, items: any[]) => ({
  type: FETCH_FEED_SUCCESS,
  url,
  items,
});
