import React, { Component } from 'react';

import Auxi from '../../hoc/AuxFolder/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
     // ; debugger
       console.log(this.props.isAuthenticated)
        return (
            <Auxi>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                 isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}

const mapStateToProps = (state) =>{
return {
    isAuthenticated:state.authReducer.user !==null
}

}
export default connect(mapStateToProps,null) ( Layout);