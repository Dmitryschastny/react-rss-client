/* eslint-disable no-plusplus */
import * as idb from 'idb';

import {
  ADD_SOURCE,
  DELETE_SOURCE,
  SELECT_SOURCE,
  SET_SELECTED_SOURCE,
  LOAD_SOURCES,
} from './types';

export const addSource = (title, url) => async (dispatch) => {
  const db = await idb.openDB('clientDatabase', 1);

  const id = await db.put('sources', { title, url });

  dispatch({
    type: ADD_SOURCE,
    id,
    title,
    url,
  });
};

export const deleteSource = (id) => async (dispatch) => {
  const db = await idb.openDB('clientDatabase', 1);

  await db.delete('sources', id);

  dispatch({
    type: DELETE_SOURCE,
    id,
  });
};

export const selectSource = (id) => ({
  type: SELECT_SOURCE,
  id,
});

export const setSelectedSource = (id) => ({
  type: SET_SELECTED_SOURCE,
  id,
});

export const loadSources = () => async (dispatch) => {
  const db = await idb.openDB('clientDatabase', 1);

  const res = await db.getAll('sources');
  const keys = await db.getAllKeys('sources');

  const sources = res.map((item, index) => ({ ...item, id: keys[index] }));

  dispatch({
    type: LOAD_SOURCES,
    sources,
  });
};
