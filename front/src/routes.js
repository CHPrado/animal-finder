import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Animal from './pages/Animal';
import Found from './pages/Found';
import Login from './pages/Login';
import Main from './pages/Main';
import OwnerAnimals from './pages/OwnerAnimals';
import Register from './pages/Register';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/found" component={Found} />
      <Route path="/animal" component={Animal} />
      <Route path="/owner/animals" component={OwnerAnimals} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
