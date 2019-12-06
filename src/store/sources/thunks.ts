import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { ApplicationState } from "..";
import { addSource, deleteSource } from "./actions";

export const thunkAddSource = (
  title: string,
  url: string,
): ThunkAction<void, ApplicationState, null, Action<string>> => async (dispatch) => {
  // const db = await idb.openDB('clientDatabase', 1);

  // const id = await db.put('sources', { title, url });

  dispatch(addSource({
    id: 0,
    userId: 0,
    title,
    url,
  }));
}

export const thunkDeleteSource = (
  id: number
): ThunkAction<void, ApplicationState, null, Action<string>> => async (dispatch) => {
  // async (dispatch: Dispatch) => {
  //   // const db = await idb.openDB('clientDatabase', 1);

  //   // await db.delete('sources', id);

  dispatch(deleteSource(id));
};

// export const loadSources = () => async (dispatch) => {
//   const db = await idb.openDB('clientDatabase', 1);

//   const res = await db.getAll('sources');
//   const keys = await db.getAllKeys('sources');

//   const sources = res.map((item, index) => ({ ...item, id: keys[index] }));

//   dispatch({
//     type: LOAD_SOURCES,
//     sources,
//   });
// };
