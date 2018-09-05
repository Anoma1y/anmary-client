import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './containers/Admin';
import Notification from './containers/Notification';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Switch>
      <Route path={'/admin'} component={Admin} />
    </Switch>
  </Fragment>
);
