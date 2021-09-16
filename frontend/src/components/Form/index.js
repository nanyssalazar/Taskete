import React, { useState } from 'react';
import api from '../../services/api';
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

  const submitHandler = async (event) => {
    event.preventDefault();
    // Recolectando info del autor
    const author = localStorage.getItem('_id');
    console.log(title, author, colorValue);
    const response = await api.post('/lists/', {
      title: title,
      author: author,
      colorValue: colorValue,
    });
    console.log(response);
    window.location.reload();
  };

  return (
    <>
      <div className='backdrop' onClick={props.onClose} />
      <form className='form' onSubmit={submitHandler}>
        <p>New List</p>
        <label>List's title</label>
        <input
          type='text'
          required
          placeholder="Your list's title"
          value={title}
          onChange={titleChangeHandler}
        />
        <label>List's color</label>
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
            Add List
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
