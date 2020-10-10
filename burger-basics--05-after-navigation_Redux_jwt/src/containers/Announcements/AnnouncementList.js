import React, { Component } from 'react'
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

 class AnnouncementList extends Component {
   
    componentDidMount() {
        console.log('ORders will be fetched..')
       //  this.props.onFetchOrders(this.props.userId);
     
        // console.log('ilans fetched..')
         
         
         let url = "https://localhost:44384/sample/GetIlanList";

         let axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          };
      
         
          axios
          .get(url,axiosConfig)
          .then((response) => {
            console.log(response);
           // this.setState({ loading: false , errorStatus:true,  message:response.data.resultExplanation});
          })
          .catch((error) => {
           // debugger;
            console.log(error);
          
          });
      };
     
       
      
   
   
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default (withErrorHandler( AnnouncementList,axios));
