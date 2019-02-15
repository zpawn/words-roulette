import { actionTypes } from "./index";

////

const INIT_STATE = {
  isSignIn: false
};

const authReset = state => ({ ...state, isSignIn: false });

const authSignInSuccess = state => ({ ...state, isSignIn: true });

////

export const reducer = (state = INIT_STATE, { type, ...payload }) => {
  switch (type) {
    case actionTypes.AUTH_RESET:
      return authReset();
    case actionTypes.AUTH_SIGN_IN_SUCCESS:
      return authSignInSuccess();
    default:
      return state;
  }
};
