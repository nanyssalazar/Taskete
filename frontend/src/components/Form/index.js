import React, { useState } from 'react';
import './Form.scss';

const Form = (props) => {
  const [title, setTitle] = useState('');
  const [colorValue, setColorValue] = useState('#B792FF');

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const colorChangeHandler = (event) => {
    setColorValue(event.target.value);
  };

  return (
    <>
      <div className='backdrop' onClick={props.onClose} />
      <form className='form' onSubmit={(e) => props.onSubmit(e, title, colorValue)}>
        <p>New {props.mode}</p>
        <label>{props.mode}'s title</label>
        <input
          type='text'
          required
          placeholder={"Your " + props.mode.toLowerCase() + "'s title"}
          value={title}
          onChange={titleChangeHandler}
        />
        <label>{props.mode}'s color</label>
        <input
          type='color'
          list='colors'
          value={colorValue}
          onChange={colorChangeHandler}
        />
        <datalist id='colors'>
          <option value='#e4ee90' />
          <option value='#B792FF' />
          <option value='#FF9B73' />
          <option value='#FFC971' />
          <option value='#91b3fa' />
        </datalist>
        <div className='form--actions'>
          <button onClick={props.onClose} className='form__cancel'>
            Cancel
          </button>
          <button type='submit' className='form__add'>
            Add {props.mode}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
