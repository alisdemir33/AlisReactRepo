import * as actions from "./actionTypes";
import axios from "axios";

/* export const signupAttempt =(signupFormData) => {
return (dispatch ) => {

  dispatch(signupStart());

  let url = "https://localhost:44384/sample/signup";  
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    
      axios
      .post(url, signupFormData, axiosConfig)
      .then((response) => {
        console.log(response);

        dispatch(signupSuccess(response.data));
      
       // dispatch(checkAuthTimeout(response.data.token.expiration));
        //dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        ;debugger
        console.log(error);
       if(error.response!=null || error.response !== undefined)
        dispatch(signupFailed(error.response.data.error));
        else
        dispatch(signupFailed('Sunucu Erişim Hatası!'));
      });
  };

}
 */

export const authAttempt = (username, password, isSignUp) => {
  return (dispatch) => {
    /*    const authData = {
      email: username,
      password: password,
      returnSecureToken: true,
    };
    */
    dispatch(authStart()); // state

    let url = "";
    if (isSignUp)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxpnatOOvVFVw0-A_jnKLBadI_Rh43_Mw";
    else url = "https://localhost:44384/sample/authenticate";

    var postData = {
      Username: username,
      Password: password,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post(url, postData, axiosConfig)
      .then((response) => {
        console.log(response);

        /* const expirationDate = new Date(
          new Date().getTime() + 180//response.data.token.expiration;expiresIn
           * 1000
        ); */

        debugger;

        if (response.data.resultCode === 1) {
          dispatch(authFailed(response.data.resultExplanation));
        }
        else {
          localStorage.setItem("accessToken", response.data.token.accessToken);
          localStorage.setItem("refreshToken",response.data.token.refreshToken);
          localStorage.setItem(
            "expirationDateTime",
            response.data.token.expiration
          );

          localStorage.setItem("userId", response.data.user.id);

          dispatch(authSuccess(response.data));
        }
        // dispatch(checkAuthTimeout(response.data.token.expiration));
        //dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        debugger;
        console.log(error);
        if (error.response != null || error.response !== undefined)
          dispatch(authFailed(error.response.data.error));
        else dispatch(authFailed("Sunucu Erişim Hatası!"));
      });
  };
};

//App den sayfa reload olunca reduxtan uçan token bilgisi local storage dan kontrol ediliyor..
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("expirationDateTime")
      );
      console.log(expirationDate);
      if (expirationDate < new Date()) {
        console.log("kucuk!");
        dispatch(logOut());
      } else {
        dispatch(
          authSuccess({
            idToken: token,
            userId: localStorage.getItem("userId"),
          })
        );
        //  dispatch(checkAuthTimeout((expirationDate.getTime() - (new Date().getTime()))/1000));
      }
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return (dispatch) => {
    dispatch(setRedirectPath(path));
  };
};

//expirationTime dolduğunda otomatik logout yapıyor..
/* export const checkAuthTimeout = (expirationTime) => {
  console.log('BEFORE AUTO LOGOUT:'+(expirationTime))
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogOut());
      console.log('AUTO LOGOUT:'+(300 * 1000))
    // dispatch(authCheckState());
    }, (300 * 1000));
  };
}; */

export const logOut = () => {
  //localStorage.removeItem("token");
  localStorage.removeItem("expirationDateTime");
  localStorage.removeItem("userId");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

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

/* export const signupStart = () => {
  return {
    type: actions.SIGNUP_START,
  };
};

export const signupSuccess = (authData) => {
  return {
    type: actions.SIGNUP_SUCCESS,
    payload: authData,
  };
};
export const signupFailed = (error) => {
  return {
    type: actions.SIGNUP_FAILED,
    payload: error,
  };
}; */

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
