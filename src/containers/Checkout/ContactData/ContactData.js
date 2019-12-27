import React, { Component } from 'react';
import Button from '../../../components/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Kevin Hart',
        address: '34 BV, Hollywood',
        phoneNumber: '+35558873',
        email: 'Kev.H@gmial.com'
      }
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

  render() {
    let form = (
      <form>
        <input
          className={Classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={Classes.Input}
          type="email"
          name="email"
          placeholder="Your E-mail"
        />
        <input
          className={Classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={Classes.Input}
          type="text"
          name="postal"
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
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
