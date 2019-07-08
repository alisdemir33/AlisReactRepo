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
       var sayacTemp=this.state.sayac1;
       if(this.state.sayac1>0)
       sayacTemp=sayacTemp-1;
       
        var sayac2temp=this.state.sayac2;
        this.setState({           
            sayac1 : sayacTemp,
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

 

