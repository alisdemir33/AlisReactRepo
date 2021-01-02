import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';


const checkoutSummary = (props) =>{
return(

    <div className={classes.CheckoutSummary}>
        <h1>Tastes Good!</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients= {props.ingredients}/>
                <Button clicked={props.checkOutCanceled} btnType="Danger">Cancel</Button>
                <Button clicked={props.checkOutContinued}  btnType="Success">Order</Button>            
        </div>
    </div>
);

}

export default checkoutSummary;