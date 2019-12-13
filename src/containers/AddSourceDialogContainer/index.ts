import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { toggleSourceAddDialog } from '../../store/sources/actions';
import { ApplicationState } from '../../store';

import AddSourceDialog from '../../components/AddSourceDialog';
import { addSourceRequested } from '../../store/sources/actions';

export default connect((state: ApplicationState) => ({
  isOpen: state.sources.isAddDialog,
  error: state.sources.errorMessage,
  loading: state.sources.isLoading
}), (dispatch: ThunkDispatch<{}, {}, any>) => ({
  toggleDialog: () => dispatch(toggleSourceAddDialog()),
  onSourceAdd: (url: string) => dispatch(addSourceRequested(url)),
}))(AddSourceDialog);
