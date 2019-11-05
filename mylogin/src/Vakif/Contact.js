
import React, { Component } from 'react';
import { isTSMethodSignature } from '@babel/types';
import VakifList from './VakifInfo';
import VakifForm from './VakifSorguForm';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      vakifList: null,
      cityName: '',
      foundationName: '',
      isLoading: false,
      errorStatus:false
    }
    this.getVakifListFromServer = this.getVakifListFromServer.bind(this);
  }

  pageNumber = 1;

  getVakifListFromServer(e) {

    let pageSize = 10;
    let cityNameGlob = '';
    let foundationNameGlob = '';
    let api_call = null;
    let response = null;

    if (e != null && e != undefined) {

      e.preventDefault();

      if (e.target.elements.PageSize.value != '')
        pageSize = e.target.elements.PageSize.value;

      if (e.target.elements.CityName.value != '') {
        cityNameGlob = e.target.elements.CityName.value;
      } else {
        cityNameGlob = this.state.cityName;
      }

      if (e.target.elements.FoundationName.value != '') {
        foundationNameGlob = e.target.elements.FoundationName.value;
      } else {
        foundationNameGlob = this.state.foundationName;
      }

     // this.setState({ isLoading: true });

      console.log(foundationNameGlob, cityNameGlob);

      axios.get(`http://localhost:1135/api/Values/GetVakifListByPagedList?cityFilter=${cityNameGlob}&foundationFilter=${foundationNameGlob}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`)
        .then(response =>
          this.setState({
            vakifList: { PagedListMetaData: response.data.PagedListMetaData, InnerList: response.data.InnerList },
            isLoading: false,
            cityName: cityNameGlob,
            foundationName: foundationNameGlob,
            errorStatus:false
          }, () => {
                //set state call back..
          }))
        .catch(error => this.setState({
          error:true,
          isLoading: false
        }));
      console.log(this.state.vakifList);
      console.log(this.state.vakifList);
    }
  }

  handlePageClick = data => {
    this.pageNumber = data.selected;
    this.getVakifListFromServer();
  };

  render() {
    const { vakifList } = this.state;
    console.log(vakifList);

    if (this.state.isLoading === true) {
      return (
        <h1>Loading..!</h1>
      );
    }
    else {

      if (error) {
        return (
          <h1>No Data Found..!</h1>
        );
      }

      if (this.state.vakifList != null) {
        debugger;
        return (
          <div>
            <h2>SYD Vakıf Listesi Vakıf Sayısı :{vakifList == null ? 0 : vakifList.RecordCount}</h2>
            {/*  <ul>{list}</ul> */}

            <VakifForm getVakifListFromServerFunction={this.getVakifListFromServer} />
            <div><h2>Active Filters: {this.state.cityName === null || this.state.cityName === '' ? '' : 'City Name:' + this.state.cityName}
              {this.state.foundationName === null || this.state.foundationName === '' ? '' : 'Foundation Name:' + this.state.foundationName}  </h2></div>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.vakifList == null ? 0 : this.state.vakifList.PagedListMetaData.PageCount}
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
      else {
        return (
          <VakifForm getVakifListFromServerFunction={this.getVakifListFromServer} />
        );
      }
    }
  }
}

export default Contact;