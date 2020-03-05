import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  render() {
    return (
    <div className={classes.ContactData}>
        <h4>Enter Your Contact Data Please!</h4>
        <form>
            <input type="Text" name="Name" placeholder="Your Name"></input>
            <input type="Email" name="Email" placeholder="Your Email"></input>
            <input type="Text" name="Street" placeholder="Street Name"></input>
            <input type="Text" name="PostalCode" placeholder="Postal Code"></input>
            <Button btnType='SUCCESS'>ORDER</Button>
        </form>
    </div>
    );
  }
}

export default ContactData;
