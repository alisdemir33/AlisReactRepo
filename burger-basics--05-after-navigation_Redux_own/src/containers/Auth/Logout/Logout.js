import React, { Component } from 'react'
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


class Logout extends Component {
    
    componentDidMount(){
        this.props.onLogout();    
    }
    
    render() {
        return (
            <div>
                <Redirect to='/'></Redirect>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLogout : () =>{ 
            dispatch(actions.logOut());
    }}
}

export default  connect(null,mapDispatchToProps) (Logout);
