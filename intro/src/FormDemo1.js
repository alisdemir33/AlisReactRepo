import React, { Component } from "react";

export default class FormDemo1 extends Component {
  state = { userName: '', cityName:'' };

  onChangeHandler = e => {
  // this.setState({userName: e.target.value});

let name= e.target.name;
let value=e.target.value;
this.setState({[name]:value});

  };
  render() {
 
    return (
      <div>
        <form>
          <h3>User Name</h3>
          <input
            type="text"
            name="userName"
            onChange={this.onChangeHandler}
          ></input>
          <h3>userName is:{this.state.userName}</h3>

          <h3>City Name</h3>
          <input
            type="text"
            name="cityName"
            onChange={this.onChangeHandler}
          ></input>
          <h3>City is:{this.state.cityName}</h3>    
            

        </form>
      </div>
    );
  }
}
