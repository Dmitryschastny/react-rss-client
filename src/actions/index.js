/* eslint-disable no-plusplus */
let nextSourceId = 0;

export const addSource = (title, url) => ({
  type: 'ADD_SOURCE',
  id: nextSourceId++,
  title,
  url,
});

export const deleteSource = (id) => ({
  type: 'DELETE_SOURCE',
  id,
});

export const selectSource = (id) => ({
  type: 'SELECT_SOURCE',
  id,
});

export const setCurrentSourceId = (id) => ({
  type: 'SET_SELECTED_SOURCE_ID',
  id,
});
