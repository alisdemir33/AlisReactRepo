import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";
import Validation from "./Validation";
import CharComponent from "./CharComponent";

class App extends Component {
  state = {
    textStateValue: ""
  };

  nameChangedHandler = event => {
    let textValue = event.target.value;
    this.setState({ textStateValue: textValue });
  };

  deleteCharHandler = index => {
    const charsCopied = [...this.state.textStateValue.split("")];
    charsCopied.splice(index, 1);
    this.setState({
      textStateValue: charsCopied.join("")
    });
  };

  render() {
    let charArr = this.state.textStateValue.split("");
    console.log(charArr);

    let displayChars = charArr.map((c, index) => {
      return (
        <CharComponent
          deleteCharHandler={() => this.deleteCharHandler(index)}
          value={c}
        />
      );
    });

    return (
      <div className="App">
        <input
          type="text"
          onChange={this.nameChangedHandler}
          value={this.state.textStateValue}
        ></input>
        <h1>Hi, I'm a React App</h1>
        <p>Length:{this.state.textStateValue.length}</p>
        <Validation
          stringLength={this.state.textStateValue.length}
        ></Validation>
        {displayChars}
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
