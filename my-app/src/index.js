import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hi from './ArrMap/ArrMap';
import MerhabaDunya from './ArrMap/Merhaba'
import Selamlama from './ArrMap/Selamlama'
import CounterMainClass from './Counter/CounterMain'
import Room from './LambRoom/Lamb'
import Reddit from './Reddit/Reddit'
import ThemeMain from './ThemeSelector/ThemeMain'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import * as serviceWorker from './serviceWorker';

import $ from 'jquery';
import Popper from 'popper.js';

ReactDOM.render(<ThemeMain/>, document.getElementById('root'));

/* ReactDOM.render(<CounterMainClass/> ,document.getElementById('root')); */

/* ReactDOM.render(<Hi/>, document.getElementById('root'));
ReactDOM.render(<MerhabaDunya/>, document.getElementById('root')); 
ReactDOM.render(<Selamlama/>, document.getElementById('root'));
ReactDOM.render(<Reddit/>, document.getElementById('root'));
 ReactDOM.render(<Room/> ,document.getElementById('root')); */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
