import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import SignIn from '../../components/SignIn';
import { loginRequested } from '../../store/user/actions';
import { ApplicationState } from '../../store';

export default connect((state: ApplicationState) => ({
  error: state.user.authError,
  isAuthorized: state.user.isAuthorized,
}), (dispatch: ThunkDispatch<{}, {}, any>) => ({
  onSubmit: (email: string, password: string) => dispatch(loginRequested(email, password)),
}))(SignIn);
