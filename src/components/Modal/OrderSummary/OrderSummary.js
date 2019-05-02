import React, { Fragment } from 'react';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
      {props.ingredients[key]}
    </li>
  ));

  return (
    <Fragment>
      <h3>Are you sure you want to proceed with the following order?</h3>
      <p>You ordered a delicious sandwitch with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
    </Fragment>
  );
};

export default orderSummary;
