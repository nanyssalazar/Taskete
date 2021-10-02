import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import AlertDialog from '../../components/AlertDialog';
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
  //sets listId that will be deleted
  const [listForRemoval, setListForRemoval] = useState('');

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const showAlertHandler = () => {
    setAlertIsShown(true);
  };

  const hideAlertHandler = () => {
    setAlertIsShown(false);
  };

  const deleteOrAlert = async (e, listId) => {
    setListForRemoval(listId);
    const response = await api.get(`/tasks/${listId}`);
    const tasksFetched = response.data;
    //Genera error haciendo que el usuario deba dar doble click para poder eliminar listas vacias
    //causa: se tarda en setear el id
    if (tasksFetched.length === 0) {
      deleteList();
      return;
    }
    showAlertHandler();
  };

  const deleteList = async () => {
    const _id = listForRemoval;
    // LLAMADA API BORRAR LISTS
    const responseLists = await api.delete(`/lists/${_id}`);
    console.log(responseLists.data.message);
    responseLists.data.message === 'List Deleted'
      ? console.log('Se ha eliminado la lista.')
      : console.log('No ha sido posible eliminar la lista.')
    // LLAMADA API BORRAR TASKS DE UNA LIST
    const responseTasks = await api.delete(`/lists/tasks/${_id}`);
    responseTasks.data.message === 'Tasks Deleted'
      ? console.log('Se eliminaron tareas dentro de lista')
      : console.log('No hay elementos en la lista.')
    console.log(responseTasks.data.message);
    //window.location.reload();
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
              {...list}
            />
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
