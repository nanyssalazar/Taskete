import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import ListItem from "../../components/ListItem";
import api from "../../services/api";
import "./Lists.scss";

const Lists = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const submitList = async (e, title, colorValue) => {
    e.preventDefault();
    const author = localStorage.getItem("_id");
    console.log(title, author, colorValue);
    const response = await api.post("/lists/", {
      title: title,
      author: author,
      colorValue: colorValue,
    });
    console.log(response);
    window.location.reload();
  };

  const fetchLists = async () => {
    const author = localStorage.getItem("_id");
    const response = await api.get(`/lists/${author}`);
    const listsFetched = response.data;
    setLists(listsFetched);
    setIsLoading(false);
  };

  useEffect(() => {
    // we need the time out for local storage author
    let timer = setTimeout(() => {
      fetchLists();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Sidebar onAdd={showFormHandler} title="My lists" returnButton={false} />
      {formIsShown && (
        <Form mode="List" onSubmit={submitList} onClose={hideFormHandler} />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : lists.length > 0 ? (
        <div className="lists-container">
          {lists.map((list) => (
            <ListItem key={list._id} {...list} />
          ))}
        </div>
      ) : (
        <>
          <div className="no-lists">
            <p>You don't have any lists yet</p>
            <img src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif?cid=ecf05e475guek39srikhna896xhu67fmy2jccyf82nztpmba&rid=giphy.gif&ct=g" alt="Spongebob gif that says to do: nothing" />
          </div>
        </>
      )}
    </div>
  );
};

export default Lists;
