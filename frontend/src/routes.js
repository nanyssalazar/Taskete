import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lists from './pages/Lists';
import Tasks from './pages/Tasks';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/lists' exact component={Lists} />
        <Route path='/lists/:listId' exact component={Tasks} />
      </Switch>
    </BrowserRouter>
  );
};
