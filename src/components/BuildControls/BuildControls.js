import React from 'react';
import Classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className={Classes.BuildControls}>
    <p>
      That will be <strong>{props.price.toFixed(2)}$</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        disabledInfo={props.disabledInfo[control.type]}
        counter={props.counter[control.type]}
      />
    ))}

    <button
      className={Classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
