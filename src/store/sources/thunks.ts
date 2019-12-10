import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { addSource, deleteSource, loadSources, selectSource } from "./actions";
import { db } from '../../utils/api';

export const thunkAddSource = (title: string, url: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const userId = 0;

    const id = await db.create('sources', { title, url, userId });

    dispatch(addSource({
      id,
      userId,
      title,
      url,
    }));
  }
);

export const thunkDeleteSource = (id: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    await db.delete('sources', id);

    dispatch(selectSource(null));
    dispatch(deleteSource(id));
  }
);

export const thunkLoadSources = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const sources = await db.getAll('sources');

    dispatch(loadSources(sources));
  }
);
