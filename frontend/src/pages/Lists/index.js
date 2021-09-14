import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import './Lists.scss';
import api from '../../services/api';

const Lists = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [lists, setLists] = useState([]);

  const showFormHandler = () => {
    setFormIsShown(true);
    console.log('HERE');
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const fetchLists = async () => {
    const author = localStorage.getItem('_id');
    const response = await api.get(`/lists/${author}`);
    const listsFetched = response.data;
    setLists(listsFetched);
    console.log(listsFetched);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <Sidebar onAddList={showFormHandler} />
      {formIsShown && <Form onClose={hideFormHandler} />}
      <div className='lists-content'>
        {lists.length > 0 ? (
          lists.map((list) => (
            <>
              <p key={list._id}> {list.title}</p>
              <p>{list.colorValue}</p>
            </>
          ))
        ) : (
          <h1>No lists yet.</h1>
        )}
      </div>
    </div>
  );
};

export default Lists;
