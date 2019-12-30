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
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },

      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'normal', displayValue: 'Normal' }
          ]
        },
        value: ''
      }
    },
    loading: false
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

  inputChangedHandler(event, inputIdentifier) {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
          />
        ))}
        <Button btnType="Success">Order Now</Button>
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
