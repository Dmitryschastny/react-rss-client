import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { selectSource, toggleSourceAddDialog, toggleSourceDeleteDialog } from '../../store/sources/actions';
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
  toggleSourceAddDialog: () => dispatch(toggleSourceAddDialog()),
  toggleSourceDeleteDialog: (id: null | number) => dispatch(toggleSourceDeleteDialog(id)),
}))(SourcesList);
