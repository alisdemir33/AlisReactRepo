import * as actionTypes from './Actions'

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const addFive = (valueToAdd) => {
    return {
        type: actionTypes.ADDFIVE,
        payload:valueToAdd
    }
}

export const subFive = (valueToSub) => {
    return {
        type: actionTypes.SUBFIVE,
        payload:valueToSub
    }
}

