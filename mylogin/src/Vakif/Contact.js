
import React, { Component } from 'react';
import { isTSMethodSignature } from '@babel/types';
import VakifList from './VakifInfo';
import VakifForm from './VakifSorguForm';
import ReactPaginate from 'react-paginate';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      vakifList: null,
      cityName: ''
    }
  }

  pageNumber = 1;

  getVakifListFromServer = async (e) => {

    let pageSize = 10;
    let cityNameGlob = '';
    let api_call = null;
    let response = null;

    if (e != null && e != undefined) {

      e.preventDefault();

      pageSize = e.target.elements.PageSize.value;
      cityNameGlob = e.target.elements.City.value;

      if (cityNameGlob != '') {

        fetch(`http://localhost:1135/api/Values/GetVakifListByPagedList?filter=${cityNameGlob}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`)
          .then(response => response.json())
          .then(data => this.setState({
            cityName: cityNameGlob,
            vakifList: response
          }));
      } else {
        fetch(`http://localhost:1135/api/Values/GetVakifListByPagedList?filter=${this.state.cityName}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`)
          .then(response => response.json())
          .then(data => this.setState({
            vakifList: response
          }));
      }
      console.log(response);

      /*        
             this.setState({ cityName: cityNameGlob }, () =>
               api_call =  fetch(`http://localhost:1135/api/Values/GetVakifListByPagedList?filter=${this.state.cityName}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`),
               response =  api_call.json()    
             );
           }else{
             api_call = fetch(`http://localhost:1135/api/Values/GetVakifListByPagedList?filter=${this.state.cityName}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`);
             response = api_call.json();
           }
            
           const api_call = await fetch(`http://172.16.200.121:8001/api/Values/GetVakifListByPaging?filter=${cityName}&pageNumber=${pageNumber}&pageSize=${pageSize}`); 
           const api_call = await fetch(`http://localhost:1135/api/Values/GetVakifListByPagedList?filter=${this.state.cityName}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`);
           response = await api_call.json(); */
    }
  }


  handlePageClick = data => {
    this.pageNumber = data.selected;
    this.getVakifListFromServer();
  };



  render() {

    const { vakifList } = this.state;
    return (
      <div>
        <h2>SYD Vakıf Listesi Vakıf Sayısı :{vakifList == null ? 0 : vakifList.RecordCount}</h2>
        {/*  <ul>{list}</ul> */}

        <VakifForm getVakifListFromServerFunction={this.getVakifListFromServer} />
        <div><h2>Active Filters: {this.state.cityName === null || this.state.cityName === '' ? '' : 'City Name:' + this.state.cityName}</h2></div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={vakifList == null ? 0 : vakifList.PagedListMetaData.PageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        <VakifList vakifList={vakifList} />

        {/*  <button className="btn btn-info" onClick={this.getVakifListFromServer}> FLİP </button> */}
      </div>

    );
  }
}

export default Contact;