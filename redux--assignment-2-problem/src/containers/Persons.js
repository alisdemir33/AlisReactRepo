import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions'

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
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

    render () {
        return (
            <div>
               <input name="personName" value={this.state.name} onChange={ (event) => this.nameChanged(event)} type='text'></input>
               <input name="personAge" value={this.state.age} onChange={ (event) => this.ageChanged(event)} type='text'></input>
                <AddPerson personAdded={ () => this.props.onStoreResult(
                    {
                        id: Math.random(), // not really unique but good enough here!
                        name:this.state.name,
                        age: this.state.age
                    }
                )} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeleteItem(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
   
    return {      
        persons: state.personReducer.persons //state.ResultReducer.results
    };

};

const mapDispatchToProps = (dispatch) => {

    return {     
        onStoreResult: (itemValue) => { dispatch({ type: actionTypes.ADDPERSON,payload: itemValue }) },
        onDeleteItem: (itemValue) => { dispatch({ type: actionTypes.DELETEPERSON, payload: itemValue }) }
    }

}
//mapStateToProps yok ise null gönderiyoruz
export default connect(mapStateToProps, mapDispatchToProps)(Persons);