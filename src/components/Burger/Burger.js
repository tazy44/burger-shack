import React from 'react';
import Classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  //Extracting all the keys of the ingredients object into an Array
  let transformedIngredeints = Object.keys(props.ingredients)
    .map(ingredientKey => {
      //Looping on every ingredientKey
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        //Looping as many times as the value of each ingredientKey
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      });
    })
    //reducing the multidimensional array into a single one
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredeints.length <= 0) {
    transformedIngredeints = <p>Please, start adding ingredients!</p>;
  }

  return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredeints}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
