import React from 'react';


 

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

var data = {
  content: {
      people: [
        {
          name: "Test",
          age : 24
        },
        {
          name: "Foo",
          age: 25
        }
      ],
      pets: [
        {
          name: "Sweety",
          age: 3
        },
        {
          name: "Kitty",
          age: 5
        }
      ]
   }
};

function Hi (){

      //Get the keys in data.content. This will return ['people', 'pets']
      var contentKeys = Object.keys(data.content);
     // alert(contentKeys)
      //Now start iterating through these keys and use those keys to
      //retrieve the underlying arrays and then extract the name field
      var allNames = contentKeys.map((t) => 
                         data.content[t].map((e) =>
                          (<div>{e.name} {e.age}</div>))
                         );  
      return (<div>{allNames}</div>)  
}

export default Hi;
