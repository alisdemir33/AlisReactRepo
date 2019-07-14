import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hi from './App';
import MerhabaDunya from './Merhaba'
import Selamlama from './Selamlama'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CounterMainClass from './CounterMain.js'
import Room from './Lamb.js'
import Reddit from './Reddit.js'
import * as serviceWorker from './serviceWorker';

import $ from 'jquery';
import Popper from 'popper.js';


/* ReactDOM.render(<Hi/>, document.getElementById('root'));

ReactDOM.render(<MerhabaDunya/>, document.getElementById('root')); 
ReactDOM.render(<Selamlama/>, document.getElementById('root'));*/

ReactDOM.render(<CounterMainClass/> ,document.getElementById('root'));
/* ReactDOM.render(<Room/> ,document.getElementById('root')); */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
