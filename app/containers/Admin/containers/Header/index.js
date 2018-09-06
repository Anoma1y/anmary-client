import React, { Component } from 'react';
import HeaderBreadcrumbs from './components/HeaderBreadcrumbs';
import Logout from './components/Logout';
import { Grid } from '@material-ui/core';
import './style.scss';

export default class Header extends Component {
  render() {
    return (
      <Grid container className={'header'} justify={'space-between'}>
        <Grid item xs={6} className={'header_item header_breadcrumbs'}>
          <HeaderBreadcrumbs />
        </Grid>
        <Grid item xs={2} className={'header_item header_logout'}>
          <Logout />
        </Grid>
      </Grid>
    );
  }
}
