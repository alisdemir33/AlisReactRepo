import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../AuxFolder/Auxi";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
     
        this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          
          this.setState({ error: error });
         
          ;debugger
          
          return new Promise((resolve, reject) => {
            const originalReq = error.config;
            if (
              error.response.status === 401 &&
              error.config &&
              !error.config.__isRetryRequest
            ) {
              originalReq._retry = true;

              let res = fetch("https://localhost:44384/sample/RefreshToken", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                  Device: "device",
                  Token: localStorage.getItem("accessToken"),
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({
                 // token: localStorage.getItem("token").accessToken,
                  RefreshToken: localStorage.getItem("refreshToken")
                }),
              })
                .then((res) => res.json())
                .then((res) => {
                 
                  ;debugger
                  console.log('REsponse:'+res);

                /*   const expirationDate = new Date(
                    new Date().getTime() + 300//response.data.expiresIn
                     * 1000
                  ); */

                  localStorage.setItem("accessToken", res.token.accessToken);
                  localStorage.setItem("refreshToken", res.token.refreshToken);
                  localStorage.setItem("expirationDateTime", res.token.expiration);                

                  originalReq.headers["Token"] = res.token.accessToken;
                  originalReq.headers.Authorization  = "Bearer "+res.token.accessToken;
                  originalReq.headers["Device"] = "device";

                  return axios(originalReq);
                });

              resolve(res);
            }

            return Promise.reject(error);
          });
        }
      );
    }


    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};


export default  withErrorHandler;
