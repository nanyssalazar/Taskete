import React, { useState } from "react";
import "./Form.scss";

const Form = (props) => {
  const [title, setTitle] = useState("");
  const [colorValue, setColorValue] = useState("#B792FF");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const colorChangeHandler = (event) => {
    setColorValue(event.target.value);
  };

  const handleSubmit = (event) => {
    props.onSubmit(event, title, colorValue);
  };

  const keyHandler = (event) => {
    let inputs = document.getElementsByTagName("input");
    if (event.key === "Enter") {
      const currentNode = event.target;
      // find index of current input
      const currentIndex = [...inputs].findIndex((el) =>
        currentNode.isEqualNode(el)
      );
      if (currentIndex === inputs.length - 1) {
        // submit form if there's no more inputs
        document.getElementById("form-add").click();
      } else {
        // go to next input
        const targetIndex = (currentIndex + 1) % inputs.length;
        inputs[targetIndex].focus();
      }
    }
  };

  window.onkeydown = (event) => {
    if (event.key === "Escape") {
      props.onClose();
    }
  };
  return (
    <>
      <div className="backdrop" onClick={props.onClose} />
      <form className="form">
        <p>New {props.mode}</p>
        <label>{props.mode}'s title</label>
        <input
          type="text"
          required
          placeholder={"Your " + props.mode.toLowerCase() + "'s title"}
          value={title}
          onChange={titleChangeHandler}
          onKeyDown={keyHandler}
        />
        <label>{props.mode}'s color</label>
        <input
          type="color"
          list="colors"
          value={colorValue}
          onChange={colorChangeHandler}
          onKeyDown={keyHandler}
        />
        <datalist id="colors">
          <option value="#e4ee90" />
          <option value="#B792FF" />
          <option value="#FF9B73" />
          <option value="#FFC971" />
          <option value="#91b3fa" />
        </datalist>
        <div className="form--actions">
          <button
            type="button"
            onClick={props.onClose}
            className="form__cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            className="form__add"
            id="form-add"
            onClick={handleSubmit}
          >
            Add {props.mode}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
