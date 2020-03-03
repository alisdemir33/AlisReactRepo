import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id:'11', name: "Max", age: 28 },
      { id:'22',name: "Manu", age: 29 },
      { id:'33',name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    toggleShowName: true
  };

  nameChangedHandler = (event,id) => {
   
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person= {...this.state.persons[personIndex]};
    person.name=event.target.value;
    const persons= [...this.state.persons];
    persons[personIndex]=person; 
    this.setState({ persons: persons});
  };

  toggleShowNameHandler = () => {
    const doesShow = this.state.toggleShowName;
    this.setState({ toggleShowName: !doesShow });
  };

  deletePersonHandler = index => {
    const personsCopied = [...this.state.persons];
    personsCopied.splice(index, 1);
    this.setState({
      persons: personsCopied
    });
  };

  render() {
    let personsList = null;
    
    if (this.state.toggleShowName) {
      
      personsList = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                nameChangedHandler = { (event) => this.nameChangedHandler(event,person.id)}
              />
            );
          })}
        </div>
      );
    }


    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.toggleShowNameHandler}>Switch Name</button>
        {personsList}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
