export interface Source {
  id: number;
  userId: number;
  url: string;
  title: string;
}

export interface SourcesState {
  readonly byId: { [key: number]: Source };
  readonly selectedSourceId: null | number;
  readonly isLoading: boolean;
  readonly errorMessage: null | string;
  readonly isAddDialog: boolean;
  readonly isDeleteDialog: boolean;
  readonly deleteSourceId: null | number;
}

export enum SourcesActions {
  ADD_SOURCE_REQUESTED = 'ADD_SOURCE_REQUESTED',
  ADD_SOURCE_SUCCEEDED = 'ADD_SOURCE_SUCCEEDED',
  ADD_SOURCE_FAILED = 'ADD_SOURCE_FAILED',
  DELETE_SOURCE = 'DELETE_SOURCE',
  SELECT_SOURCE = 'SELECT_SOURCE',
  LOAD_SOURCES_REQUESTED = 'LOAD_SOURCES_REQUESTED',
  LOAD_SOURCES_SUCCEEDED = 'LOAD_SOURCES_SUCCEEDED',
  LOAD_SOURCES_FAILED = 'LOAD_SOURCES_FAILED',
  TOGGLE_SOURCE_DELETE_DIALOG = 'TOGGLE_SOURCE_DELETE_DIALOG',
  TOGGLE_SOURCE_ADD_DIALOG = 'TOGGLE_SOURCE_ADD_DIALOG',
}

interface AddSourceRequestedAction {
  type: SourcesActions.ADD_SOURCE_REQUESTED;
  url: string;
}

interface AddSourceSucceededAction extends Source {
  type: SourcesActions.ADD_SOURCE_SUCCEEDED;
}

interface AddSourceFailedAction {
  type: SourcesActions.ADD_SOURCE_FAILED;
  error: string;
}

interface DeleteSourceAction {
  type: SourcesActions.DELETE_SOURCE;
  id: number;
}

interface LoadSourcesRequestedAction {
  type: SourcesActions.LOAD_SOURCES_REQUESTED;
}

interface LoadSourcesSucceededAction {
  type: SourcesActions.LOAD_SOURCES_SUCCEEDED;
  sources: { [key: number]: Source };
}

interface LoadSourcesFailedAction {
  type: SourcesActions.LOAD_SOURCES_FAILED;
  error: string;
}

interface SelectSourceAction {
  type: SourcesActions.SELECT_SOURCE;
  id: number | null;
}

interface ToggleSourceAddDialogAction {
  type: SourcesActions.TOGGLE_SOURCE_ADD_DIALOG;
}

interface ToggleSourceDeleteDialogAction {
  type: SourcesActions.TOGGLE_SOURCE_DELETE_DIALOG;
  id: null | number;
}

export type SourcesActionTypes =
  AddSourceRequestedAction |
  AddSourceSucceededAction |
  AddSourceFailedAction |
  DeleteSourceAction |
  SelectSourceAction |
  ToggleSourceAddDialogAction |
  ToggleSourceDeleteDialogAction |
  LoadSourcesRequestedAction |
  LoadSourcesSucceededAction |
  LoadSourcesFailedAction;
