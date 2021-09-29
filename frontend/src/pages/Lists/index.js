import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import AlertDialog from '../../components/AlertDialog'
import ListItem from '../../components/ListItem';
import api from '../../services/api';
import './Lists.scss';

const Lists = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [alertIsShown, setAlertIsShown] = useState(false);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //used to call useEffect everythime a form is sent
  const [formSent, setFormSent] = useState(false);

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const showAlertHandler = () => {
    setAlertIsShown(true);
  }

  const hideAlertHandler = () => {
    setAlertIsShown(false);
  };

  const deleteOrAlert = async (e, listId) => {
    const response = await api.get(`/tasks/${listId}`);
    const tasksFetched = response.data;
    if (tasksFetched.length === 0) {
      deleteList(e, listId);
      return;
    }
    showAlertHandler();
  };

  const deleteList = async (e, listId) => {
    e.preventDefault();
    // TODO: Agregar petición para eliminar lista
  };


  const submitList = async (e, title, colorValue) => {
    e.preventDefault();
    const author = localStorage.getItem('_id');
    console.log(title, author, colorValue);
    const response = await api.post('/lists/', {
      title: title,
      author: author,
      colorValue: colorValue,
    });
    console.log(response);
    setFormSent(true);
    hideFormHandler();
  };

  const fetchLists = async () => {
    const author = localStorage.getItem('_id');
    const response = await api.get(`/lists/${author}`);
    const listsFetched = response.data;
    setLists(listsFetched);
    setIsLoading(false);
  };

  useEffect(() => {
    // we need the time out for local storage author
    let timer = setTimeout(() => {
      fetchLists();
      setFormSent(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [formSent]);

  return (
    <div>
      <Sidebar onAdd={showFormHandler} title='My lists' returnButton={false} />
      {formIsShown && (
        <Form mode='List' onSubmit={submitList} onClose={hideFormHandler} />
      )}
      {alertIsShown && (
        <AlertDialog
          title='Delete list?'
          message='This list contains tasks.'
          submitBtnMsg='Delete list'
          onClose={hideAlertHandler}
          onSubmit={deleteList}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : lists.length > 0 ? (
        <div className='lists-container'>
          {lists.map((list) => (
            <ListItem
              onDelete={(e) => deleteOrAlert(e, list._id)}
              key={list._id}
              {...list} />
          ))}
        </div>
      ) : (
        <>
          <div className='no-lists'>
            <p>You don't have any lists yet</p>
            <img
              src='https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif?cid=ecf05e475guek39srikhna896xhu67fmy2jccyf82nztpmba&rid=giphy.gif&ct=g'
              alt='Spongebob gif that says to do: nothing'
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Lists;
