import React, { Component } from 'react';
import Button from '../../../components/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';
import InputElement from '../../../components/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        label: 'Your Name',
        errorMessage: 'Your name should consist of 1 to 16 characters',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          maxLength: 16
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        label: 'Your street',
        errorMessage: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      zipCode: {
        elementType: 'input',
        label: 'Your ZIP code',
        errorMessage: 'You have to enter 5 characters',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },

      country: {
        elementType: 'input',
        label: 'Your Country',
        errorMessage: '',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: 'input',
        label: 'Your E-mail address',
        errorMessage: '',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: 'select',
        label: 'Your Delivery method',
        errorMessage: '',
        elementConfig: {
          options: [
            { value: 'fast', displayValue: 'Fast Delivery' },
            { value: 'normal', displayValue: 'Normal Delivery' }
          ]
        },
        value: 'fast',
        validation: {
          required: false
        },
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let inputElementIdentifier in this.state.orderForm) {
      formData[inputElementIdentifier] = this.state.orderForm[
        inputElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerData: formData
    };

    axios
      .post('/orders.json', order)
      .then(res => {
        console.log('Order Placed Successfully');
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler(event, inputIdentifier) {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderFormElement.valid = this.checkValidity(
      updatedOrderFormElement.value,
      updatedOrderFormElement.validation
    );
    updatedOrderFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    //console.log(updatedOrderFormElement.valid);
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(formElement => (
          <InputElement
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            errorMessage={formElement.config.errorMessage}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order Now
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
