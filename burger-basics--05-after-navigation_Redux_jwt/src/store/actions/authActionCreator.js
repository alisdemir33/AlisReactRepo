import * as actions from "./actionTypes";
import axios from "axios";

export const authAttempt = (username, password, isSignUp) => {
  return (dispatch) => {
    const authData = {
      email: username,
      password: password,
      returnSecureToken: true,
    };
   
    dispatch(authStart());// state 

    let url = "";
    if (isSignUp)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxpnatOOvVFVw0-A_jnKLBadI_Rh43_Mw";
    else
      url ="https://localhost:44384/sample/authenticate";
      
    var postData = {
      Username: username,
      Password: password
    };
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    
      axios
      .post(url, postData, axiosConfig)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + 600//response.data.expiresIn
           * 1000
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationDateTime", expirationDate);
        localStorage.setItem("userId",response.data.username);

        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFailed(error.response.data.error));
      });


  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
   
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDateTime"));
      if (expirationDate < new Date()) {
        dispatch(logOut());
      } else {
        dispatch(authSuccess({idToken:token, localId : localStorage.getItem("userId")}));
        dispatch(checkAuthTimeout((expirationDate.getTime()- (new Date().getTime()))/1000));
      }
    }
  };
};


export const setAuthRedirectPath = (path) => {
  return (dispatch) => {
    dispatch(setRedirectPath(path));
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
  
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDateTime");
  localStorage.removeItem("userId");
  
  return (dispatch) => {
    dispatch(authLogOut());
  };
};


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
    payload: path,
  };
};

export const authLogOut = (expirationTime) => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

