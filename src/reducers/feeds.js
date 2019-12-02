const feeds = (state = { isFetching: false, feedsByUrl: {} }, action) => {
  switch (action.type) {
    case 'FETCH_FEED_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_FEED_FAILURE':
      return {

      };
    case 'FETCH_FEED_SUCCESS':
      return {
        ...state,
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

export default feeds;
