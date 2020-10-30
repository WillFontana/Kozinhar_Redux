import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Main from '../pages/Main';
import Login from '../pages/Login';
// te

function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main}  isPrivate/>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default routes;