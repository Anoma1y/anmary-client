import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './containers/Admin';
import Auth from './containers/Auth';
import Shop from './containers/Shop';
import Notification from './containers/Notification';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Switch>
      <Route exact path={'/'} component={Shop} />
      <Route path={'/admin'} component={Admin} />
      <Route path={'/auth'} component={Auth} />
    </Switch>
  </Fragment>
);
