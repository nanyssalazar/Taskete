import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Logout from "../Logout";
import "./Sidebar.scss";

const Sidebar = (props) => {
  let history = useHistory();

  const returnButtonHandler = () => {
    history.push("/lists");
  };
  return (
    <div className="sidebar">
      <div>
        <p className="sidebar__title">{props.title}</p>
        <button className="sidebar__add" onClick={props.onAddList}>
          +
        </button>
      </div>
      {props.returnButton ? (
        <IoArrowBackOutline
          className="sidebar__return"
          onClick={returnButtonHandler}
        />
      ) : (
        <Logout />
      )}
    </div>
  );
};

export default Sidebar;
