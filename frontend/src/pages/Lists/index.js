import React, {useState} from 'react'
import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import "./Lists.scss";

const Lists=()=> {
    const [formIsShown, setFormIsShown] = useState(false);

    const showFormHandler = () => {
      setFormIsShown(true);
      console.log("HERE");
    };

    const hideFormHandler = () => {
      setFormIsShown(false);
    };

    return (
      <div>
        <Sidebar onAddList={showFormHandler}/>
        {formIsShown && <Form onClose={hideFormHandler}/>}
        <div className="lists-content">
          {/* <h2>All lists from user.</h2> */}
        </div>
      </div>
    );
}

export default Lists;
