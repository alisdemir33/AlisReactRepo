import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './auth';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';

class Login extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      'email': '',
      password: '',
      validate: {
        emailState: ''
      },
      redirectToReferrer:false
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({ [name]: value, });
  }

  submitForm(e) {
    e.preventDefault();
    if(this.state.email== 'a@a.com' && this.state.password=='1'){
      Auth.login(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      });
    }else{
      Auth.logout(() => alert('signed out!')
      );
    }

    console.log(`Email: ${this.state.email}`)
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-danger'
    }
    this.setState({ validate })
  }

  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email"
                name="email"
                id="exampleEmail"
                placeholder="youremail@email.com"
                valid={this.state.validate.emailState === 'has-success'}
                invalid={this.state.validate.emailState === 'has-danger'}
                onChange={(e) => {
                  this.validateEmail(e)
                  this.handleChange(e)
                }}
              />
              <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
              <FormFeedback invalid>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input type="password"
                name="password"
                id="examplePassword"
                placeHolder="Enter Your Password"
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Col>
        </Form>
      </Container>
    )
  }
}


export default Login;
