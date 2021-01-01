import React from 'react';

import './AddPerson.css';

class AddPerson extends React.Component{

    state = {
        name: '',
        age:''
    }

    nameChanged = (event) =>{
        this.setState({name:event.target.value});
    }

    ageChanged = (event) => {
        this.setState({age:event.target.value});
    }  

    render(){
        return(
         <div className="AddPerson">
        <input name="personName" value={this.state.name} onChange={(event) => this.nameChanged(event)} type='text'></input>
        <input name="personAge" value={this.state.age} onChange={(event) => this.ageChanged(event)} type='text'></input>
        <button onClick={ () => this.props.personAdded({
                        id: Math.random(), // not really unique but good enough here!
                        name:this.state.name,
                        age: this.state.age
                    })}>Add Person</button>
        </div>);

    }
}

export default AddPerson;