import React, { Component } from 'react'
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

 class Auth extends Component {
   
    state = {
        // ingredients: null,
        LoginForm: {
         
            email: {
                elementType: "email",
                elementConfig: {
                  type: "text",
                  placeholder: "Your Email",
                },
                value: "",
                touched: false,
                validation: {
                  required: true,
                  isEmail:true
                },
                valid: false,
              },
         
            password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password",
            },
            value: "",
            touched: false,
            validation: {
              required: true,
              minLength:6
            },
            valid: false,
          },
    
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    loginHandler = (event) => {
        event.preventDefault();
       // console.log(this.props.totalPrice);
    
       // this.setState({ loading: true }); redux a
    
        const formData = {};
    
        for (let formElemIdentifier in this.state.orderForm) {
          formData[formElemIdentifier] = this.state.orderForm[
            formElemIdentifier
          ].value;
        }
    
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.totalPrice,
          orderData: formData,
        };
    
      /*   axios
          .post("/orders.json", order)
          .then((response) => {
            this.setState({ loading: false }, () => {
              this.props.history.push("/");
            });
    
            alert("Order is accepted!");
          })
          .catch((error) => {
            this.setState({ loading: false });
          }); */
    
          this.props.onOrderSubmit(order);
      };
         
    
   
    render() {
        const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    const formWithElements = formElementsArray.map((item) => {
        return (
          <Input
            key={item.id}
            invalid={!item.config.valid}
            touched={item.config.touched}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            customMsg={item.config.elementConfig.placeholder}
            value={item.config.value}
            shouldValidate={item.config.validation && item.config.touched}
            changed={(event) => this.inputChangedHandler(event, item.id)}
          ></Input>
        );
      });

      let form = (
        <form onSubmit={this.loginHandler}>
          {formWithElements}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      );

    return(

    );

   
}
 }

export default Auth;