import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { thunkAddSource, thunkDeleteSource } from '../../store/sources/thunks';
import { selectSource } from '../../store/sources/actions';
import { thunkFetchFeed } from '../../store/feeds/thunks';
import { ApplicationState } from '../../store';

import SourcesList from '../../components/SourcesList';
import { Source } from '../../store/sources/types';

export default connect((state: ApplicationState) => ({
  itemsById: state.sources.byId,
  selectedSourceId: state.sources.selectedSourceId,
}), (dispatch: ThunkDispatch<{}, {}, any>) => ({
  onSourceClick: (item: Source | null) => {
    dispatch(selectSource(item ? item.id : null));

    if (item !== null) {
      dispatch(thunkFetchFeed(item.url));
    }
  },
  onSourceAdd: (title: string, url: string) => {
    dispatch(thunkAddSource(title, url));
  },
  onSourceDelete: (id: number) => dispatch(thunkDeleteSource(id)),
}))(SourcesList);
