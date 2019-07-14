import React from 'react'
import CounterSub from './CounterSub';
import Room from './Lamb';
import Reddit from './Reddit';
/* import ThemeSwitcher from './themeSwitcher' */
import ThemeSwitcher from './ReactStrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class CounterMainClass extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            sayac1: 3,
            sayac2: 5
        }

        this.sayac1Artir = this.sayac1Artir.bind(this);
        this.sayac2Artir = this.sayac2Artir.bind(this);
    }

    sayac1Artir() {
        this.setState(
            {
              
                sayac1: this.state.sayac1 < 10 ?  this.state.sayac1 + 1 : this.state.sayac1,              
                sayac2: this.state.sayac2 > 0  ? this.state.sayac2 - 1 : this.state.sayac2
            }
        )
    }

    sayac2Artir() {
        this.setState({
            sayac1: this.state.sayac1 - 1,
            sayac2: this.state.sayac2 + 1
        })
    }

    render() {
        return <div className="container">
               <div class="card-header">COUNTER</div>
            <div className="card bg-primary text-white">
                <div className="card-body">
                    <CounterSub sayac={this.state.sayac1} artir={this.sayac1Artir} cls="btn btn-warning" />
                    <CounterSub sayac={this.state.sayac2} artir={this.sayac2Artir} cls="btn btn-danger" />
                </div>
            </div>

            <div className="card bg- text-blue">
            <div class="card-header">ODA</div>
                <div className="card-body">
                    <Room />
                </div>
            </div>

           {/*  <div className="card bg-warning text-blue">
                <div className="card-body">
                    <Reddit />
                </div>
            </div> */}
               <div className="card bg-warning text-blue">
                <div className="card-body">
                    <ThemeSwitcher />
                </div>
            </div>
        </div>;
    }

}
export default CounterMainClass;