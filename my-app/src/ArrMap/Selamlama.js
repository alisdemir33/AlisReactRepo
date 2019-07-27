import React from 'react'
import MerhabaDunya from './Merhaba';


var data = {
  content: {
    people: [
      {
        name: "Test",
        age: 24
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


class Selamlama extends React.Component {
  render() {

    //Get the keys in data.content. This will return ['people', 'pets']
    var contentKeys = Object.keys(data.content);
    // alert(contentKeys)
    //Now start iterating through these keys and use those keys to
    //retrieve the underlying arrays and then extract the name field
    var allNames = contentKeys.map((t) =>
      data.content[t].map((e) =>     
      (<MerhabaDunya isim={e.name} yas={e.age}/>)
      )
    );

    return (
      <div>
          {allNames}
      </div>
    )
  }
}
export default Selamlama;