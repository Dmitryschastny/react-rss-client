import {
  SourcesActions,
  Source,
  SourcesActionTypes,
} from './types';

export const addSourceRequested = (url: string): SourcesActionTypes => ({
  type: SourcesActions.ADD_SOURCE_REQUESTED,
  url,
});

export const addSourceSucceeded = (source: Source): SourcesActionTypes => ({
  type: SourcesActions.ADD_SOURCE_SUCCEEDED,
  ...source,
});

export const addSourceFailed = (error: string): SourcesActionTypes => ({
  type: SourcesActions.ADD_SOURCE_FAILED,
  error,
});

export const deleteSource = (id: number): SourcesActionTypes => ({
  type: SourcesActions.DELETE_SOURCE,
  id,
});

export const selectSource = (id: number | null): SourcesActionTypes => ({
  type: SourcesActions.SELECT_SOURCE,
  id,
});

export const loadSourcesRequested = (): SourcesActionTypes => ({
  type: SourcesActions.LOAD_SOURCES_REQUESTED,
});

export const loadSourcesSucceeded = (sources: { [key: number]: Source }): SourcesActionTypes => ({
  type: SourcesActions.LOAD_SOURCES_SUCCEEDED,
  sources,
});

export const loadSourcesFailed = (error: string): SourcesActionTypes => ({
  type: SourcesActions.LOAD_SOURCES_FAILED,
  error,
});

export const toggleSourceAddDialog = (): SourcesActionTypes => ({
  type: SourcesActions.TOGGLE_SOURCE_ADD_DIALOG,
});

export const toggleSourceDeleteDialog = (id: null | number): SourcesActionTypes => ({
  type: SourcesActions.TOGGLE_SOURCE_DELETE_DIALOG,
  id,
});
