import React from 'react';
import Classes from './BuildControl.css';

const buildControl = props => (
  <div className={Classes.BuildControl}>
    <div className={Classes.Label}>{props.label}</div>
    <button className={Classes.More} onClick={props.addIngredient}>
      More
    </button>
    <button
      className={Classes.Less}
      onClick={props.removeIngredient}
      disabled={props.disabledInfo}
    >
      Less
    </button>
  </div>
);

export default buildControl;
