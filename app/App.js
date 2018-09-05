import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './containers/Admin';
import './style.scss';

export default () => (
  <Switch>
    <Route path={'/admin'} component={Admin} />
  </Switch>
);
