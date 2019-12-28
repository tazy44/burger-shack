import React from 'react';
import Classes from './Order.css';

const order = props => {
  //Converting ingredients from an object to an array
  const ingredientsArr = [];
  for (let key in props.ingredients) {
    ingredientsArr.push({ name: key, amount: props.ingredients[key] });
  }

  const IngredientOutput = ingredientsArr.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '4px 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={Classes.Order}>
      <p>Ingredients: {IngredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
