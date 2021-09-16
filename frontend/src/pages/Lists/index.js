import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import ListItem from "../../components/ListItem";
import api from "../../services/api";
import "./Lists.scss";

const Lists = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [lists, setLists] = useState([]);
  const [sortedLists, setSortedLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  const showFormHandler = () => {
    setFormIsShown(true);
    console.log("HERE");
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const fetchLists = async () => {
    const author = localStorage.getItem("_id");
    const response = await api.get(`/lists/${author}`);
    const listsFetched = response.data;
    setLists(listsFetched);
    setIsLoading(false);
    console.log("LISTS", listsFetched);
    setSortedLists(
      listsFetched.sort((a, b) => b.lastEdited - a.lastEdited).reverse()
    );
    console.log("SORTED LISTS", sortedLists);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchLists();
    }, 150);
  }, []);

  return (
    <div>
      <Sidebar onAddList={showFormHandler} />
      {formIsShown && <Form onClose={hideFormHandler} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : sortedLists.length > 0 ? (
        <div className="lists-container">
          {sortedLists.map((list) => (
            <ListItem key={list._id} {...list} />
          ))}
        </div>
      ) : (
        <>
          <div className="no-lists">
            <p>You don't have any lists yet</p>
            <img src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif?cid=ecf05e475guek39srikhna896xhu67fmy2jccyf82nztpmba&rid=giphy.gif&ct=g" />
          </div>
        </>
      )}
    </div>
  );
};

export default Lists;
