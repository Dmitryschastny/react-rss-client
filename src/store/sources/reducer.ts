import {
  SourcesState,
  SourcesActions,
  SourcesActionTypes,
} from './types';

export const initialState: SourcesState = {
  byId: {},
  selectedSourceId: null,
  deleteSourceId: null,
  isLoading: false,
  errorMessage: null,
  isAddDialog: false,
  isDeleteDialog: false,
}

const sources = (state = initialState, action: SourcesActionTypes) => {
  switch (action.type) {
    case SourcesActions.ADD_SOURCE_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case SourcesActions.ADD_SOURCE_SUCCEEDED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: { id: action.id, title: action.title, url: action.url, userId: action.userId },
        },
        isLoading: false,
      };
    case SourcesActions.ADD_SOURCE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      }
    case SourcesActions.DELETE_SOURCE:
      const { [action.id]: deleted, ...items } = state.byId;

      return {
        ...state,
        byId: items,
        deleteSourceId: null,
      };
    case SourcesActions.SELECT_SOURCE:
      return {
        ...state,
        selectedSourceId: action.id,
      };
    case SourcesActions.LOAD_SOURCES_SUCCEEDED:
      return {
        ...state,
        byId: action.sources
      };
    case SourcesActions.TOGGLE_SOURCE_ADD_DIALOG:
      return {
        ...state,
        isAddDialog: !state.isAddDialog,
        errorMessage: null,
      };
    case SourcesActions.TOGGLE_SOURCE_DELETE_DIALOG:
      return {
        ...state,
        isDeleteDialog: !state.isDeleteDialog,
        deleteSourceId: action.id,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export { sources as sourcesReducer };
