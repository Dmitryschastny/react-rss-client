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

export const loadSources = (sources: { [key: number]: Source }): SourcesActionTypes => ({
  type: SourcesActions.LOAD_SOURCES,
  sources,
});

export const toggleSourceAddDialog = (): SourcesActionTypes => ({
  type: SourcesActions.TOGGLE_SOURCE_ADD_DIALOG,
});

export const toggleSourceDeleteDialog = (id: null | number): SourcesActionTypes => ({
  type: SourcesActions.TOGGLE_SOURCE_DELETE_DIALOG,
  id,
});
