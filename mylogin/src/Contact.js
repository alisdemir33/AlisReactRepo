
import React, { Component } from 'react';
import TableComponent from './VakifInfo';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      vakifList:[]
    }

  }

  getVakifListFromServer = async (e) => {
    e.preventDefault();
    const pageSize = 0;//e.target.elements.city.value;
    const pageNumber = 0;//e.target.elements.country.value; */

    var response = null;
    if (pageSize >= 0 && pageNumber >= 0) {


      const api_call = await fetch(`http://172.16.200.121:8001/api/Values/GetVakifListByPaging?pageNumber=10&pageSize=10`);
      response = await api_call.json();    
      console.log(response.value);
      this.setState({
        vakifList: response
        /*  temperature: response.main.temp,
         city: response.name,
         country: response.sys.country,
         humidity: response.main.humidity,
         description: response.weather[0].description,
         error: "" */
      })
    } else {
      this.setState({
        vakifList: null
      })
    }

    console.log(response);
  }



  render() {
    
    const { vakifList } = this.state;
    const list = vakifList.map((item, key) =>
      <li key={item.VAKIF_ILCESI}>İli :{item.VAKIF_ILI} İlçesi {item.VAKIF_ILCESI}    </li>
    );
    console.log(list);

    return (
      <div>
        <h2>Rating From state :{vakifList.length}</h2>
        <ul>{list}</ul>
       {/*  <TableComponent data = {vakifList} /> */}
        <button className="btn btn-info" onClick={this.getVakifListFromServer}> FLİP </button>
      </div>

    );

  }
}

export default Contact;