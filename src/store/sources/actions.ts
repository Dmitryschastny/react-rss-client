import {
  SourcesActionTypes,
  Source,
  ADD_SOURCE,
  DELETE_SOURCE,
  SELECT_SOURCE,
} from './types';

export const addSource = (source: Source): SourcesActionTypes => ({
  type: ADD_SOURCE,
  ...source,
});

export const deleteSource = (id: number): SourcesActionTypes => ({
  type: DELETE_SOURCE,
  id,
});

export const selectSource = (id: number | null): SourcesActionTypes => ({
  type: SELECT_SOURCE,
  id,
});
