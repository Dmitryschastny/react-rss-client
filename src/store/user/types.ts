export interface UserState {
  readonly isAuthorized: boolean;
  readonly authError: string | null;
  readonly email: string;
}

export enum UserActions {
  LOGIN_REQUESTED = 'LOGIN_REQUESTED',
  LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
}

interface LoginRequestedAction {
  type: UserActions.LOGIN_REQUESTED;
  email: string;
  password: string;
}

interface LoginSucceededAction {
  type: UserActions.LOGIN_SUCCEEDED;
  email: string;
}

interface LoginFailedAction {
  type: UserActions.LOGIN_FAILED;
  error: string;
}

interface Logout {
  type: UserActions.LOGOUT;
}

export type UserActionTypes =
  LoginRequestedAction |
  LoginSucceededAction |
  LoginFailedAction |
  Logout;
