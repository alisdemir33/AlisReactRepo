import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (itemValue) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: itemValue
    }

}

export const removeIngredient = (itemValue) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: itemValue
    }

}

export const initIngredients = (ing) => {
    return {
        type: actionTypes.INIT_INGREDIENT,
        payload: ing,
        error:false
    }
}

export const initIngredientsFailed = () => {
    return {
        type: actionTypes.INIT_INGREDIENT_FAILED ,
        payload:true       
    }
}

export const initIngredientsFromServer = (token) => {

    return (dispatch) => {     
      // ;debugger
        let  jwtConfig=null;
         
        jwtConfig = {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("accessToken")//token.accessToken
            }
         }      

     
        axios
            .get("/sample/GetIngredients", jwtConfig )
            .then(response => {
                console.log(response.data);
                //this.setState({ ingredients: response.data });
                dispatch(initIngredients(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(initIngredientsFailed())
            });
    }
}



