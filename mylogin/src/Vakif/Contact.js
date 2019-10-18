
import React, { Component } from 'react';
import { isTSMethodSignature } from '@babel/types';
import VakifList from './VakifInfo';
import VakifForm from './VakifSorguForm';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      vakifList: []
    }
  }

  getVakifListFromServer = async (e) => {
    //alert('1');
    e.preventDefault();
    let pageSize = 10;
    let pageNumber = 1;

    let cityName = e.target.elements.City.value;
    console.log(e);
    alert(cityName);
    pageSize = e.target.elements.PageSize.value;
    pageNumber = e.target.elements.PageNumber.value;

    if (pageSize == null ||  pageSize =='')
      pageSize = 10;

    if (pageNumber == null || pageNumber=='')
      pageNumber = 1;

    console.log(e);
    var response = null;
    alert(pageSize+' '+pageNumber);
    if (pageSize != null && pageSize > 0 && pageNumber != null && pageNumber >= 0) {

      const api_call = await fetch(`http://172.16.200.121:8001/api/Values/GetVakifListByPaging?filter=${cityName}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
      response = await api_call.json();
      console.log(response.value);
      this.setState({
        vakifList: response
      })
    } else {
      this.setState({
        vakifList: null
      })
    }
  }

  render() {

    const { vakifList } = this.state;
    return (
      <div>
        <h2>SYD Vakıf Listesi Vakıf Sayısı :{vakifList == null ? 0 : vakifList.length}</h2>
        {/*  <ul>{list}</ul> */}
        <VakifForm getVakifListFromServerFunction={this.getVakifListFromServer} />
        <VakifList vakifList={vakifList} />
        {/*  <button className="btn btn-info" onClick={this.getVakifListFromServer}> FLİP </button> */}
      </div>

    );
  }
}

export default Contact;