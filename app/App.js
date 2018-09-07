import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './containers/Admin';
import Auth from './containers/Auth';
import Notification from './containers/Notification';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Switch>
      <Route path={'/admin'} component={Admin} />
      <Route path={'/auth'} component={Auth} />
    </Switch>
  </Fragment>
);
