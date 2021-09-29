import React from "react"
import './AlertDialog.scss';

const AlertDialog = (props) => {
  window.onkeydown = (event) => {
    // Close on Escape key
    if (event.key === "Escape") {
      props.onClose();
    }
    // Submit on Enter key
    if (event.key === "Enter") {
      document.getElementById("alert-confirm").click();
    }
  };

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
          <button
            id="alert-confirm"
            type="submit"
            className="alert__confirm"
          >
            {props.submitBtnMsg}
          </button>
        </div>
      </form>
    </>
  );
}

export default AlertDialog;
