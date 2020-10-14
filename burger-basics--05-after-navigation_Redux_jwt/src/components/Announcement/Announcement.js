import React,{ Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "../../containers/Announcements/AnnouncementList.css";



class Announcement extends React.Component {  

    state = {
      announcementList:[],
      loading:false,
      error:false
    }

  
    
render (){
  return (
    [
      <tr key={this.props.currAnnouncement.iseAlimTalebiNoField}>
        <td>{this.props.currAnnouncement.iseAlimTalebiNoField}</td>
        <td>{this.props.currAnnouncement.cityField}</td>
        <td>{this.props.currAnnouncement.districtField}</td>
        <td>{this.props.currAnnouncement.basvuruBitisZamaniField}</td>
        <td>{this.props.currAnnouncement.belgeTeslimTarihiField}</td>
        <td>{this.props.currAnnouncement.calismaSekliField}</td>
        <td>
          <Button btnType="Success">Başvur</Button>
          <Button clicked={ ()=>this.props.toggleVisibility(this.props.currAnnouncement.iseAlimTalebiNoField)} 
          btnType="Danger">
            Detay {this.props.currAnnouncement.Visibility? 'Gizle':'Göster'}
          </Button>
        </td>
      </tr>
      ,
      <tr className={ classes.trVisible }>
        <td colSpan={7}>{this.props.currAnnouncement.Visibility?this.props.currAnnouncement.aciklamaField:''}</td>
      </tr>
    ]
  );
};

}


export default Announcement;
