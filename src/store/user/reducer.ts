import {
  UserState,
  UserActionTypes,
  UserActions
} from './types';

export const initialState: UserState = {
  authError: null,
  isAuthorized: false,
  email: 'Guest',
}

const user = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActions.LOGIN_REQUESTED:
      return {
        ...state,
      };
    case UserActions.LOGIN_SUCCEEDED:
      return {
        authError: null,
        isAuthorized: true,
        email: action.email,
      };
    case UserActions.LOGIN_FAILED:
      return {
        ...state,
        authError: action.error,
      };
    case UserActions.LOGOUT:
      return {
        ...state,
        isAuthorized: false,
        email: 'Guest'
      };
    default:
      return state;
  }
};

export { user as userReducer };
