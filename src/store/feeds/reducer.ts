import {
  FeedsState,
  FETCH_FEED_REQUEST,
  // FETCH_FEED_FAILURE,
  FETCH_FEED_SUCCESS,
  FeedsActionTypes
} from './types';

export const initialState: FeedsState = {
  isFetching: false,
  feedsByUrl: {},
}

const feeds = (state = initialState, action: FeedsActionTypes) => {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    // case 'FETCH_FEED_FAILURE':
    //   return {

    //   };
    case FETCH_FEED_SUCCESS:
      return {
        isFetching: false,
        feedsByUrl: {
          ...state.feedsByUrl,
          [action.url]: action.items,
        },
      };
    default:
      return state;
  }
};

export { feeds as feedsReducer };
