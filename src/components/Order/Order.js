import React from 'react';
import Classes from './Order.css';

const order = props => (
  <div className={Classes.Order}>
    <p>Ingredients: Salad(1)</p>
    <p>
      Price: <strong>USD 4.3</strong>
    </p>
  </div>
);

export default order;
