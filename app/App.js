import React, { Fragment } from 'react';
import Shop from './containers/Shop';
import Notification from './containers/Notification';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Shop />
  </Fragment>
);
