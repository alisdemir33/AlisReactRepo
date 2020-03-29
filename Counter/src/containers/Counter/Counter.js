import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        console.log(this.props.storedResults)
        
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
                <CounterControl label="Subtract 5" clicked={this.props.onDeleteItem} />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
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
    console.log(state.results)
    return {
        ctr: state.counter,
        storedResults: state.results
    };

};

const mapDispatchToProps = (dispatch) => {

    return {
        onIncrementCounter: () => { dispatch({ type: 'INCREMENT' }) },
        onDecrementCounter: () => { dispatch({ type: 'DECREMENT' }) },
        onAddFive: () => { dispatch({ type: 'ADDFIVE', payload: 3 }) },
        onSubtractFive: () => { dispatch({ type: 'SUBFIVE', payload: 4 }) },
        onStoreResult: () => { dispatch({ type: 'STORE' }) },
        onDeleteItem: (itemValue) => { dispatch({ type: 'DELETE', payload: itemValue }) }
    }

}
//mapStateToProps yok ise null gönderiyoruz
export default connect(mapStateToProps, mapDispatchToProps)(Counter);