import React from 'react';
import Classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

const burgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={Classes.BreadBottom} />;
      break;

    case 'bread-top':
      ingredient = (
        <div className={Classes.BreadTop}>
          <div className={Classes.Seeds1} />
          <div className={Classes.Seeds2} />
        </div>
      );
      break;

    case 'meat':
      ingredient = <div className={Classes.Meat} />;
      break;

    case 'cheese':
      ingredient = <div className={Classes.Cheese} />;
      break;

    case 'bacon':
      ingredient = <div className={Classes.Bacon} />;
      break;

    case 'salad':
      ingredient = <div className={Classes.Salad} />;
      break;

    default:
      ingredient = null;
      break;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
