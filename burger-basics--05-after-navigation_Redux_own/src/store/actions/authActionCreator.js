import * as actions from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actions.AUTH_SUCCESS,
    payload: authData,
  };
};
export const authFailed = (error) => {
  return {
    type: actions.AUTH_FAILED,
    payload: error,
  };
};

export const setRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    payload: path
  };
};

export const setAuthRedirectPath = (path) => {
  return (dispatch) => {
    dispatch(setRedirectPath(path));
  };
};

export const authLogOut = (expirationTime) => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogOut());
    }, expirationTime * 1000);
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(authLogOut());
  };
};

export const authAttempt = (userName, password, isSignUp) => {
  return (dispatch) => {
    const authData = {
      email: userName,
      password: password,
      returnSecureToken: true,
    };

  //  console.log(authData);
   
    dispatch(authStart());

    let url = "";
    if (isSignUp)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxpnatOOvVFVw0-A_jnKLBadI_Rh43_Mw";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxpnatOOvVFVw0-A_jnKLBadI_Rh43_Mw";

    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(authFailed(error.response.data.error));
      });
  };
};
