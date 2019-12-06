// export interface Feed {
//   url: string;
//   items: any[];
// }

export interface FeedsState {
  readonly isFetching: boolean;
  readonly feedsByUrl: {
    [key: string]: any[];
  };
}

export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';

interface FetchFeedRequestAction {
  type: typeof FETCH_FEED_REQUEST;
}

interface FetchFeedFailureAction {
  type: typeof FETCH_FEED_FAILURE;
}

interface FetchFeedSuccessAction {
  type: typeof FETCH_FEED_SUCCESS;
  url: string;
  items: any[];
}

export type FeedsActionTypes = FetchFeedRequestAction | FetchFeedFailureAction | FetchFeedSuccessAction;
