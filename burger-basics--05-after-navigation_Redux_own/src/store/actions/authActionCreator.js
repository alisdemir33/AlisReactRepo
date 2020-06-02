import * as actions from './actionTypes'

export const autStart = () => {

    return {
        type: actions.AUTH_START
    }

}

export const authSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        payload:authData
    }

}
export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        payload:error
        
    }
}

export const authAttempt = (userName, password) => {
    return (dispatch) => {

        dispatch(autStart);
        if (userName = '' && password == '') {
            return dispatch(authSuccess())
        } else {
            return dispatch(authFailed());
        }
    }
}
