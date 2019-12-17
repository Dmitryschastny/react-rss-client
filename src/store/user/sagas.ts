import { all, call, put, take } from "redux-saga/effects";

import * as Api from '../../utils/api';
import { loginSucceeded, loginFailed, logout } from './actions';
import { UserActions } from "./types";

function* authorize(email: string, password: string): any {
  try {
    const token: string = yield call(Api.authorize, email, password);
    yield put(loginSucceeded(email));
    return token;
  } catch (error) {
    yield put(loginFailed(error.message));
  }
}

function* loginFlow() {
  while (true) {
    const { email, password } = yield take(UserActions.LOGIN_REQUESTED);
    debugger;
    const token = yield call(authorize, email, password);

    if (token) {
      yield call(Api.setToken, token);
      yield take(UserActions.LOGOUT);
      yield call(Api.clearToken);
    }
  }
}

// function* watchLogin() {

// }

export default function* userSaga() {
  yield all([
    // watchLogin(),
    loginFlow()
  ])
}
