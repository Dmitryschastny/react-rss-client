import { connect } from 'react-redux';

import { ApplicationState } from '../../store';
import Header from '../../components/Header';
import { logout } from '../../store/user/actions';
import { ThunkDispatch } from 'redux-thunk';

export default connect((state: ApplicationState, ownProps) => ({
  isAuthorized: state.user.isAuthorized,
  userEmail: state.user.email,
  ...ownProps
}), (dispatch: ThunkDispatch<{}, {}, any>) => ({
  onLogout: () => dispatch(logout()),
}))(Header);
