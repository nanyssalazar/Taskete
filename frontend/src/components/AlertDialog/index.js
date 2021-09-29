import React from "react"
import './AlertDialog.scss';

const AlertDialog = (props) => {
  return (
    <>
      <div className='backdrop' />
      <form className='form' onSubmit={(e) => props.onSubmit(e)}>
        <p>{props.title}</p>
        <label>{props.message}</label>
        <div className='form--actions'>
          <button onClick={props.onClose} className='form__cancel'>
            Cancel
          </button>
          <button type='submit' className='form__add'>
            {props.submitBtnMsg}
          </button>
        </div>
      </form>
    </>
  )
}

export default AlertDialog;
