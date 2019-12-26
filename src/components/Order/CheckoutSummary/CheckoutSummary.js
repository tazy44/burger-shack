import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Button/Button';
import Classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={Classes.CheckoutSummary}>
      <h1>Bon Appetit</h1>
      <div className={Classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
