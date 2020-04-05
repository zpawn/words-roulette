import { alertShow } from "../alerts";
import { AuthService } from "./index";

////

const actionTypes = {
  AUTH_SIGN_IN_SUCCESS: "AUTH_SIGN_IN_SUCCESS",
  AUTH_RESET: "AUTH_RESET"
};

const authSignInSuccess = () => ({
  type: actionTypes.AUTH_SIGN_IN_SUCCESS
});

const authReset = () => ({
  type: actionTypes.AUTH_RESET
});

////

const authSignIn = (email, password) => async dispatch => {
  try {
    // ToDo: show spinner
    const user = await AuthService.signIn(email, password);
    dispatch(authSignInSuccess(user));
    dispatch(alertShow("success", "SignIn Successfully"));
    return Promise.resolve()
  } catch (e) {
    dispatch(authReset());
    dispatch(alertShow("error", e.message || "Auth failure"));
  }
};

const authSignOut = () => dispatch => {
  return AuthService.signOut()
    .then(() => dispatch(alertShow("success", "LogOut Successfully")))
    .catch(() => dispatch(alertShow("error", "LogOut Failure")))
    .finally(() => {
      dispatch(authReset());
      return Promise.resolve()
    });
};

const authCheck = () => async dispatch => {
  try {
    const user = await AuthService.check();
    user ? dispatch(authSignInSuccess()) : dispatch(authReset());
  } catch (e) {
    dispatch(authReset());
  }
};

////

export { authCheck, authSignIn, authSignOut, actionTypes };
