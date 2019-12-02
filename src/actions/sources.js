/* eslint-disable no-plusplus */
import {
  ADD_SOURCE,
  DELETE_SOURCE,
  SELECT_SOURCE,
  SET_SELECTED_SOURCE,
} from './types';

let nextSourceId = 3;

export const addSource = (title, url) => ({
  type: ADD_SOURCE,
  id: nextSourceId++,
  title,
  url,
});

export const deleteSource = (id) => ({
  type: DELETE_SOURCE,
  id,
});

export const selectSource = (id) => ({
  type: SELECT_SOURCE,
  id,
});

export const setSelectedSource = (id) => ({
  type: SET_SELECTED_SOURCE,
  id,
});
