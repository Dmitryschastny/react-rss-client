import {
  SourcesState,
  ADD_SOURCE,
  DELETE_SOURCE,
  SELECT_SOURCE,
  LOAD_SOURCES,
  SourcesActionTypes
} from './types';

export const initialState: SourcesState = {
  byId: {},
  selectedSourceId: null,
}

const sources = (state = initialState, action: SourcesActionTypes) => {
  switch (action.type) {
    case ADD_SOURCE:
      return {
        ...state,
        byId: {
          [action.id]: { id: action.id, title: action.title, url: action.url, userId: action.userId }
        }
      };
    case DELETE_SOURCE:
      const { [action.id]: deleted, ...items } = state.byId;

      return {
        ...state,
        byId: items
      };
    case SELECT_SOURCE:
      return {
        ...state,
        selectedSourceId: action.id,
      };
    case LOAD_SOURCES:
      return {
        ...state,
        byId: action.sources
      };
    default:
      return state;
  }
};

export { sources as sourcesReducer };
