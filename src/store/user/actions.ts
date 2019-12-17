import {
  UserActions,
  UserActionTypes,
} from './types';

export const loginRequested = (email: string, password: string): UserActionTypes => ({
  type: UserActions.LOGIN_REQUESTED,
  email,
  password,
});

export const loginSucceeded = (email: string): UserActionTypes => ({
  type: UserActions.LOGIN_SUCCEEDED,
  email,
});

export const loginFailed = (error: string): UserActionTypes => ({
  type: UserActions.LOGIN_FAILED,
  error,
});

export const logout = (): UserActionTypes => ({
  type: UserActions.LOGOUT,
});
