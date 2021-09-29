import React from "react"
import './AlertDialog.scss';

const AlertDialog = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.onClose} />
      <form className="alert" onSubmit={(e) => props.onSubmit(e)}>
        <p>{props.title}</p>
        <label>{props.message}</label>
        <div className="alert--actions">
          <button onClick={props.onClose} className="alert__cancel">
            Cancel
          </button>
          <button type="submit" className="alert__confirm">
            {props.submitBtnMsg}
          </button>
        </div>
      </form>
    </>
  );
}

export default AlertDialog;
