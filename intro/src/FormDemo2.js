import React, { Component } from "react";
import { Button, FormGroup, Form, Label, Input } from "reactstrap";
const alertfy = require("alertifyjs");

export default class FormDemo2 extends Component {
  state = { city: "", email: "", description: "", password: "" };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    alertfy.success(this.state.email + " Added!");
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email"> Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter description"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="select"
              name="city"
              id="city"
              onChange={this.handleChange}
            >
              <option value="6">Ankara</option>
              <option value="34">İstanbul</option>
              <option value="35">İzmir</option>
              <option value="01" >Adana</option>             
            </Input>
          </FormGroup>
          <FormGroup>
          <Button type="submit">Save</Button>  
          </FormGroup>
        </Form>
      </div>
    );
  }
}
