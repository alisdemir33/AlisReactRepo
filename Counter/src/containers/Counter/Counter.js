import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as actionTypes from '../../store/actions/Actions'

import * as actionCreators from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    /*     state = {
            counter: 0       
        }
    
        counterChangedHandler = ( action, value ) => {
            switch ( action ) {
                case 'inc':
                    this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                    break;
                case 'dec':
                    this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                    break;
                case 'add':
                    this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                    break;
                case 'sub':
                    this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                    break;
                default:
                    this.setState( ( prevState ) => { return { counter: prevState.counter } } )
                        
            }
        } */

    render() {
        let retVal = <li>Empty</li>
      //  console.log(this.props.storedResults)
        
        if (this.props.storedResults != null)
            retVal = this.props.storedResults.map((item, index) => {
                return <li onClick={() => this.props.onDeleteItem(item.id)} key={item.id} > {item.value}</li>
            });

        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddFive} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractFive} />
                <hr />
                <button onClick={ () => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {
                        retVal
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
   
    return {
        ctr: state.ctrReducer.counter,// state.CounterReducer.counter 
        storedResults: state.resultReducer.results //state.ResultReducer.results
    };

};

const mapDispatchToProps = (dispatch) => {

    return {
        onIncrementCounter: () => { dispatch( actionCreators.increment() ) },
        onDecrementCounter: () => { dispatch(actionCreators.decrement()) },
        onAddFive: () => { dispatch(actionCreators.addFive(5)) },
        onSubtractFive: () => { dispatch(actionCreators.subFive(5)) },
        onStoreResult: (itemValue) => { dispatch(actionCreators.storeValue(itemValue)) },
        onDeleteItem: (itemValue) => { dispatch(  actionCreators.deleteValue(itemValue)) }
    }

}
//mapStateToProps yok ise null gönderiyoruz
export default connect(mapStateToProps, mapDispatchToProps)(Counter);