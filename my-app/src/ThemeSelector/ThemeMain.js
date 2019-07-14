import React from 'react';
import ReactStrapThemeSwitcher from './ReactStrap'
import ReactBootstrap from './react-bootstrap'
import CounterMainClass from './../Counter/CounterMain'

class ThemeMain extends React.Component {
    render() {
        return <div> 
      {
             <ReactBootstrap /> 
          }
            <br/>
            <br/>            
          {
                <ReactStrapThemeSwitcher />       
              }     
            </div>
    }
}
export default ThemeMain;