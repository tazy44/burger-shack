import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/Modal/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  meat: 1.5,
  bacon: 0.6,
  salad: 0.4,
  cheese: 0.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0.2,
    purchasable: false,
    purchasing: false, //To control the visibility of the Modal
    loading: false,
    loadingIngredientsError: false
  };

  componentDidMount() {
    axios
      .get('https://react-burger-shack.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ loadingIngredientsError: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updattedIngredients = {
      ...this.state.ingredients
    };
    updattedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updattedIngredients });
    this.updatePurchaseState(updattedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) return;

    const updatedCount = oldCount - 1;
    const updattedIngredients = {
      ...this.state.ingredients
    };
    updattedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({ totalPrice: newPrice, ingredients: updattedIngredients });
    this.updatePurchaseState(updattedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ purchasing: false });
    //alert('Your order has been submitted successfully!');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kevin Hart',
        address: '34 BV, Hollywood',
        phoneNumber: '+35558873',
        email: 'Kev.H@gmial.com'
      }
    };
    axios
      .post('/orders.json', order)
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    //creating an identical object of the ingredients with values of true or false,
    //based on each ingredient's quantity to enable/disable the subtraction button
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          counter={this.state.ingredients}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    );

    return this.state.ingredients ? (
      burger
    ) : this.state.loadingIngredientsError ? (
      <h1 style={{ color: 'red', textAlign: 'center' }}>
        There's a network error. Check your interent connection
      </h1>
    ) : (
      <Fragment>
        <Spinner></Spinner>
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
