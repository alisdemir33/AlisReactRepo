import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../AuxFolder/Auxi";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    errorConfirmedHandler =()=>{
        this.setState({error:null})
    }

    render() {
        return (           
         <Auxi>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? <div>{this.state.error.message}</div> :null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxi> 
      );
    }
  };
};

export default withErrorHandler;
