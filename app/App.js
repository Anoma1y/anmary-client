import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth';
import Dashboard from './containers/Dashboard';
import Notification from './containers/Notification';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Switch>
      <Route path={'/dashboard'} component={Dashboard} />
      <Route path={'/auth'} component={Auth} />
    </Switch>
  </Fragment>
)
