import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    errorLoadingOrders: false
  };

  componentDidMount() {
    axios
      .get('./orders.json')
      .then(res => {
        this.setState({ loading: false });
        //const valuesArr = Object.values(res.data);
        const fetchedOrdersArr = [];
        for (let key in res.data) {
          fetchedOrdersArr.push({ ...res.data[key], id: key });
        }
        console.log(fetchedOrdersArr);
        this.setState({ orders: fetchedOrdersArr });
      })
      .catch(err => {
        this.setState({ loading: false, errorLoadingOrders: true });
        console.log(err);
      });
  }

  render() {
    let ordersBody = (
      <div>
        {this.state.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </div>
    );

    return this.state.loading ? (
      <Spinner />
    ) : this.state.errorLoadingOrders ? (
      <h1 style={{ textAlign: 'center', color: 'red' }}>
        Network Error. Please Check Your Internet Connection
      </h1>
    ) : (
      ordersBody
    );
  }
}

export default Orders;
