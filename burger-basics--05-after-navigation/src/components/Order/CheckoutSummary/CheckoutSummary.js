import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) =>{
return(){

    <div>
        <h1>Tastes Good!</h1>
        <div style={{width:'300px', height:'300px' , margin:'auto'}}>
            <Burger ingredients= {props.ingredents}>
                <Button  btnType="Danger">Cancel</Button>
                <Button  btnType="Success">Order</Button>
            </Burger>
        </div>
    </div>
}

}

export default checkoutSummary;