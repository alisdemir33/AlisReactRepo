import React from 'react';
import { Table } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';


/* getWeather = async (e) => {
  e.preventDefault();
} */

const VakifList = (props) => {

  // alert( props +' '+ props.vakifList);
  console.log(props.vakifList);
let list2='';
  if(props.vakifList!= null){
//debugger;

  list2 = props.vakifList.InnerList.map((item, key) =>

    <tr key={item.ID}>
      <th scope="row">{key + 1}</th>
      <td><StarRatingComponent
        name="rate1"
        starCount={5}
        value={(key+1)%5 === 0 ? 5 : (key+1)%5 }
      //onStarClick={this.onStarClick.bind(this)}
      /></td>      
      <td>{item.ProvinceName}</td>
      <td>{item.CountyName}</td>
      <td>{item.FName}</td>
      <td>{item.Address}</td>
      <td>{item.Phone}</td>
      <td>{item.Fax}</td>
      <td>{item.EMail}</td>
    </tr>);

  }

  return (   
  <div>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Reyting</th>         
          <th>Vakıf İli</th>
          <th>Vakıf İlçesi</th>
          <th>Vakıf Adi</th>
          <th>Vakıf Adresi</th>
          <th>Vakıf Telefon</th>         
          <th>Vakıf Fax</th>
          <th>Vakıf EMail</th>
        </tr>
      </thead>
      <tbody>
        {list2}
        {/*  <tr>
          <th scope="row">1</th>
          <td>{props.vakifList[0]}</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>*/}     
      </tbody>
    </Table>
    </div>  
  );
}
export default VakifList;