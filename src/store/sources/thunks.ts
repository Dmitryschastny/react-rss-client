import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { deleteSource, selectSource, toggleSourceDeleteDialog } from "./actions";
import { db } from '../../utils/api';
import { ApplicationState } from "..";

// export const thunkAddSource = (title: string, url: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
//   async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     const userId = 0;

//     const id = await db.create('sources', { title, url, userId });

//     dispatch(addSource({
//       id,
//       userId,
//       title,
//       url,
//     }));
//   }
// );

export const thunkDeleteSource = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState): Promise<void> => {

    const state = <ApplicationState>getState();
    const id = state.sources.deleteSourceId;

    if (id) {
      await db.delete('sources', id);

      dispatch(selectSource(null));
      dispatch(deleteSource(id));
      dispatch(toggleSourceDeleteDialog(null));
    }

  }
);

// export const thunkLoadSources = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
//   async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     const sources = await db.getAll('sources');

//     dispatch(loadSources(sources));
//   }
// );
