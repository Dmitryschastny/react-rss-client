import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { thunkDeleteSource } from '../../store/sources/thunks';
import { toggleSourceDeleteDialog } from '../../store/sources/actions';
import { ApplicationState } from '../../store';

import DeleteSourceDialog from '../../components/DeleteSourceDialog';
export default connect((state: ApplicationState) => {
  const { deleteSourceId, isDeleteDialog } = state.sources;
  let deleteTitle = '';

  if (deleteSourceId) {
    deleteTitle = state.sources.byId[deleteSourceId].title;
  }

  return {
    isOpen: isDeleteDialog,
    rssTitle: deleteTitle
  }
}, (dispatch: ThunkDispatch<{}, {}, any>) => ({
  toggleDialog: () => dispatch(toggleSourceDeleteDialog(null)),
  onSourceDelete: () => dispatch(thunkDeleteSource()),
}))(DeleteSourceDialog);
