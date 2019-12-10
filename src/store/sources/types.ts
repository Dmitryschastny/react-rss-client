export interface Source {
  id: number;
  userId: number;
  url: string;
  title: string;
}

export interface SourcesState {
  readonly byId: { [key: number]: Source };
  readonly selectedSourceId: null | number;
}

export const ADD_SOURCE = 'ADD_SOURCE';
export const DELETE_SOURCE = 'DELETE_SOURCE';
export const SELECT_SOURCE = 'SELECT_SOURCE';
export const LOAD_SOURCES = 'LOAD_SOURCES';

interface AddSourceAction extends Source {
  type: typeof ADD_SOURCE;
}

interface DeleteSourceAction {
  type: typeof DELETE_SOURCE;
  id: number;
}

interface SelectSourceAction {
  type: typeof SELECT_SOURCE;
  id: number | null;
}

interface LoadSourcesAction {
  type: typeof LOAD_SOURCES;
  sources: { [key: number]: Source };
}

export type SourcesActionTypes = AddSourceAction | DeleteSourceAction | SelectSourceAction | LoadSourcesAction;
