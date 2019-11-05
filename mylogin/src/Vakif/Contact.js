
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
      ProvinceName: '',
      foundationName: '',
      isLoading: false,
      errorStatus:false
    }
    this.getVakifListFromServer = this.getVakifListFromServer.bind(this);
  }

  pageNumber = 1;

  getVakifListFromServer(e) {

    let pageSize = 10;
    let ProvinceNameGlob = '';
    let foundationNameGlob = '';
    let api_call = null;
    let response = null;

    if (e != null && e != undefined) {

      e.preventDefault();

      if (e.target.elements.PageSize.value != '')
        pageSize = e.target.elements.PageSize.value;

      if (e.target.elements.ProvinceName.value != '') {
        ProvinceNameGlob = e.target.elements.ProvinceName.value;
      } else {
        ProvinceNameGlob = this.state.ProvinceName;
      }

      if (e.target.elements.CountyName.value != '') {
        foundationNameGlob = e.target.elements.CountyName.value;
      } else {
        foundationNameGlob = this.state.foundationName;
      }

     // this.setState({ isLoading: true });

      console.log(foundationNameGlob, ProvinceNameGlob);

      axios.get(`http://localhost:3993/api/Values/GetVakifListByPagedList?cityFilter=${ProvinceNameGlob}&foundationFilter=${foundationNameGlob}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`)
        .then(response =>
          this.setState({
            vakifList: { PagedListMetaData: response.data.PagedListMetaData, InnerList: response.data.InnerList },
            isLoading: false,
            ProvinceName: ProvinceNameGlob,
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

      if (this.state.errorStatus) {
        return (
          <h1>No Data Found..!</h1>
        );
      }

      if (this.state.vakifList != null) {
      //  debugger;
        return (
          <div>
            <h2>SYD Vakıf Listesi Vakıf Sayısı :
            {vakifList == null ? 0 : this.state.vakifList.PagedListMetaData.RecordCount}</h2>     

            <VakifForm getVakifListFromServerFunction={this.getVakifListFromServer} />
            <div><h2>Active Filters: {this.state.ProvinceName === null || this.state.ProvinceName === '' ? '' : 'Province Name: ' + this.state.ProvinceName}
              {this.state.foundationName === null || this.state.foundationName === '' ? '' : '   Foundation Name: ' + this.state.foundationName}  </h2></div>
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