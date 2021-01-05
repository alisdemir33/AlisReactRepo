import React, { Component } from "react";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Announcement from '../../components/Announcement/Announcement';
import classes from "../Announcements/AnnouncementList.css"

class AnnouncementList extends Component {

  state = {
    announcementList:[],
    loading:false,
    errorStatus:false
  }

  componentDidMount() {
    console.log("Annos will be fetched..");
    //  this.props.onFetchOrders(this.props.userId);

    // console.log('ilans fetched..')

    let url = "https://localhost:44384/sample/GetIlanList";

    const jwtConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
         Authorization: "Bearer " + localStorage.getItem("accessToken")//token.accessToken
      }
   }
    
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };


    this.setState({loading:true});

    axios
      .get(url, jwtConfig)
      .then((response) => {
        console.log(response);
         this.setState({loading:false, announcementList:response.data.resultData});
      })
      .catch((error) => {
      ;debugger
        if (error.response != null || error.response !== undefined)
           this.setState({ errorStatus:true,  message: error.response.message, loading: false });      
       else 
           this.setState({ errorStatus:true, message : "Bağlantı Hatası:"+error, loading: false });
      });
  }

  toggleRowVisibility = (talepNo) =>{
   ;debugger
 let newlist = this.state.announcementList.map( anno =>{
 
  if(anno.iseAlimTalebiNoField!==talepNo){         
  return anno;}
     else
     {
          anno.Visibility =!anno.Visibility;        
          return anno;
     }
   })
  this.setState({announcementList:newlist});
  }


  redirectToApply = ( anno) =>{

   
    this.props.history.push({
      pathname: '/applytoannouncement',
      state : {announcement:anno}
     }); 
  }

  render() {

    let announcementPlaceHolder =<Spinner/>
    //;debugger
    if(this.state.errorStatus){
    return <div> {this.state.message}</div>
    }
   

   if(this.state.loading){
     return announcementPlaceHolder;
   }
   
   if(!this.state.loading && this.state.announcementList!=null && this.state.announcementList.length>0){
      announcementPlaceHolder = this.state.announcementList.map( (announcement) =>{
            return <Announcement 
              currAnnouncement={announcement} 
              toggleVisibility={this.toggleRowVisibility}
              redirToApply={this.redirectToApply}
            />
        } ) 
    }else{
      announcementPlaceHolder = <div>Aktif İlan Bulunamadı!</div>
    }

    return (
      <div>
        <table>
          <tbody>                 
            <tr key={0}>
              <td colspan={7}>
                <b>İLAN LİSTESİ</b>
              </td>
            </tr>
            <tr key={1}>
              <th>İlan No</th>
              <th>İl</th>
              <th>İlçe</th>
              <th>Son Başvuru Tarihi</th>
              <th>Evrak Son Teslim Tarihi</th>
              <th>Çalışma Şekli</th>
              <th></th>
            </tr>            
            {announcementPlaceHolder}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withErrorHandler(AnnouncementList, axios);
