import React from 'react';
import { connect } from 'react-redux';
import classes from './BuildControl.css';

const buildControl = (props) => {
    
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}({props.ingredientPricess[props.realKey]})</div>
            <button
                className={classes.Less}
                onClick={props.removed}
                disabled={props.disabled}>Less</button>
            <button
                className={classes.More}
                onClick={props.added}>More</button>
        </div>
    );
}

const mapStateToProps = state => {    
    return {
        ingredientPricess: state.burgerReducer.INGREDIENT_PRICES
    };
};

export default connect(mapStateToProps, null)(buildControl);