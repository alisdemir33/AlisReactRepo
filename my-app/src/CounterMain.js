import React from 'react';
import CounterSub from './CounterSub.js';

class CounterMainClass extends React.Component
{  

    constructor (props){

        super(props);
        this.state ={
            sayac1:3,
            sayac2:5
        } 

        this.sayac1Artir = this.sayac1Artir.bind(this);
        this.sayac2Artir = this.sayac2Artir.bind(this);
    } 

    sayac1Artir () {

    this.setState(
        {
        sayac1 : this.state.sayac1+1,
        sayac2 : this.state.sayac2-1
        }
    )
    }

 

    sayac2Artir () {
        this.setState({
            sayac1 : this.state.sayac1-1,
            sayac2  :this.state.sayac2+1
        })
    }     

    render()
    {
     return  <div>
            <CounterSub sayac={this.state.sayac1} artir={this.sayac1Artir}/>
            <CounterSub sayac={this.state.sayac2} artir={this.sayac2Artir}/>
            </div>;

    }
}
export default CounterMainClass;

 

