const sources = (state = { items: [], selectedSourceId: null }, action) => {
  switch (action.type) {
    case 'ADD_SOURCE':
      return {
        ...state,
        items: [
          ...state.items,
          { id: action.id, title: action.title, url: action.url },
        ],
      };
    case 'DELETE_SOURCE':
      return {
        ...state,
        items: state.items.filter((source) => source.id !== action.id),
      };
    case 'SET_SELECTED_SOURCE':
      return {
        ...state,
        selectedSourceId: action.id,
      };
    default:
      return state;
  }
};

export default sources;
