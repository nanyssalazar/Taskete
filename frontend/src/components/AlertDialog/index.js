import React from "react"
import './AlertDialog.scss';

const AlertDialog = (props) => {
  return (
    <>
      <div className='backdrop' />
      <form className='form' >
        <p>Dummy text</p>
        <label>Dummy Text</label>
        <label>Dummy Text</label>
        <div className='form--actions'>
          <button onClick={props.onClose} className='form__cancel'>
            Cancel
          </button>
          <button type='submit' className='form__add'>
            Delete Dummy
          </button>
        </div>
      </form>
    </>
  )
}

export default AlertDialog;
