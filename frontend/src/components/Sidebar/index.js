import React, { useState } from "react";
import Logout from "../Logout";
import "./Sidebar.scss";

const Sidebar = (props) => {


  return (
    <div className="sidebar">
      <div>
        <p className="sidebar__title">My lists</p>
        <button className="sidebar__add" onClick={props.onAddList}>+</button>
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
