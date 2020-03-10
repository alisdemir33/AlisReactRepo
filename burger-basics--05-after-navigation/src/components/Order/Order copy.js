import React from 'react'
import classes from './Order.css'

const order  = (props) => {
const ingredients =
    Object.keys( props.ingredients )
            .map( igKey => {
                return (
                    <li key={igKey}>
                        <span                         >
                            {igKey}
                            </span>: {props.ingredients[igKey]}
                    </li> );
            } )

   return (
    <div className={classes.Order}>        
        <p>Ingredients: {
            ingredients
            } </p>
        <p>Price : <strong>{props.price}</strong> </p>
    </div>
);
}
export default order;