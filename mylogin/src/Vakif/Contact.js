
import React, { Component } from 'react';
import { isTSMethodSignature } from '@babel/types';
import VakifList from './VakifInfo';
import VakifForm from './VakifSorguForm';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Button, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      vakifList: null,
      ProvinceName: '',
      CountyName: '',
      isLoading: false,
      errorStatus: false,
      selectedPage: 0
    }
    this.getVakifListFromServer = this.getVakifListFromServer.bind(this);
  }

  pageNumber = 1;

  handlePageClick = data => {
    debugger;
    this.pageNumber = data.selected;
    this.setState({
      selectedPage: this.pageNumber
    })
    this.getVakifListFromServer(this.pageNumber);
  };

  getVakifListFromServer(e) {

    debugger;

    let pageSize = 10;
    let ProvinceNameGlob = '';
    let CountyNameGlob = '';

    if (e != null && e != undefined) {
      ProvinceNameGlob = this.state.ProvinceName;
      CountyNameGlob = this.state.CountyName;

      if (e.target != null) {
        e.preventDefault();

        if (e.target.elements.PageSize.value != '')
          pageSize = e.target.elements.PageSize.value;

        if (e.target.elements.ProvinceName.value != '') {
          ProvinceNameGlob = e.target.elements.ProvinceName.value;
        }

        if (e.target.elements.CountyName.value != '') {
          CountyNameGlob = e.target.elements.CountyName.value;
        }
      }

      console.log(CountyNameGlob, ProvinceNameGlob);
      this.setState({ isLoading: true });
      axios.get(`http://localhost:3993/api/Values/GetVakifListByPagedList?cityFilter=${ProvinceNameGlob}&foundationFilter=${CountyNameGlob}&pageNumber=${this.pageNumber}&pageSize=${pageSize}`)
        .then(response =>
          this.setState({
            vakifList: { PagedListMetaData: response.data.PagedListMetaData, InnerList: response.data.InnerList },
            isLoading: false,
            ProvinceName: ProvinceNameGlob,
            CountyName: CountyNameGlob,
            errorStatus: false
          }, () => {
            //set state call back..
          }))
        .catch(error => this.setState({
          errorStatus: true,
          isLoading: false,
          vakifList: null
        }));
      console.log(this.state.vakifList);
      console.log(this.state.vakifList);
    }
  }

  removeProvinceFilter = (e) => {
    this.setState({ ProvinceName: '' });
  }

  removeCountyFilter = (e) => {
    this.setState({ CountyName: '' });
  }

  render() {
    const { vakifList } = this.state;
    console.log(vakifList);
    var pFilter = null, cFilter = null;

    if (this.state.ProvinceName === null || this.state.ProvinceName === '')
      pFilter = <div />;
    else {
      pFilter = <h4><Button close onClick={this.removeProvinceFilter}></Button> Province : {this.state.ProvinceName}</h4>
    }
    if (this.state.CountyName === null || this.state.CountyName === '')
      cFilter = <div />;
    else {
      cFilter = <div><Button close onClick={this.removeCountyFilter}></Button><h4> County :{this.state.CountyName}</h4> </div>
    }

    var commonPart = <div>
      <h4>SYD Vakıf Listesi Vakıf Sayısı :
    {vakifList == null ? 0 : this.state.vakifList.PagedListMetaData.RecordCount}</h4>
      <div>
        {pFilter}
        <br />
        {cFilter}
      </div>
      <VakifForm getVakifListFromServerFunction={this.getVakifListFromServer} />
    </div>
    
    if (this.state.isLoading === true) {
      return (
        <Container className="App">
          {commonPart}<h1>Loading..!</h1>>
        </Container>
      );
    }
    else {

      if (this.state.errorStatus) {
        return (<Container className="App">
          {commonPart}<h4>No Data Found..!</h4>
        </Container>
        );
      }

      if (this.state.vakifList != null) {
         return (
          <div><Container className="App">
            {commonPart}

            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={this.state.vakifList == null ? 0 : this.state.vakifList.PagedListMetaData.PageCount}
              marginPagesDisplayed={3}              
              pageRangeDisplayed={3}
              forcePage={this.state.selectedPage}
              onPageChange={this.handlePageClick}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />

            <VakifList vakifList={vakifList} />

            {/*  <button className="btn btn-info" onClick={this.getVakifListFromServer}> FLİP </button> */}
          </Container>
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