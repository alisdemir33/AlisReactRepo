import * as actionTypes from './Actions'

export const saveValue = (valueToStore) => {
    return {
        type: actionTypes.STORE,
        payload: valueToStore
    }
}

export const storeValue = (valueToStore) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveValue(valueToStore));
        }, 2000);

    }
}

export const deleteValue = (valueToDelete) => {
    return {
        type: actionTypes.DELETE ,
        payload:valueToDelete     
    }
}
