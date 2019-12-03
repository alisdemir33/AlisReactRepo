import * as actiontypes from './actionTypes'

export function changecategory(category){
return {type: actiontypes.CHANGE_CATEGORY, payload:category}
}