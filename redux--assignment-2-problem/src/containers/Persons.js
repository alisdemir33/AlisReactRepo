import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions'

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {    

    render () {
        return (
            <div>               
                <AddPerson  personAdded={ this.props.onStoreResult} />
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