import React from 'react';
import Classes from './Input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [Classes.InputElement];
  if (props.invalid && props.touched) {
    inputClasses.push(Classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  let error = <p style={{ color: 'red' }}>Input is incorrect</p>;
  if (props.errorMessage) {
    error = <p style={{ color: 'red' }}>{props.errorMessage}</p>;
  }

  return (
    <div className={Classes.Input}>
      <label className={Classes.Label}>{props.label}</label>
      {inputElement}
      {props.invalid && props.touched ? error : null}
    </div>
  );
};

export default input;
