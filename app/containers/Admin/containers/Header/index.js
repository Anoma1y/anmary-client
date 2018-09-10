import React, { Component } from 'react';
import HeaderBreadcrumbs from './components/HeaderBreadcrumbs';
import { Grid } from '@material-ui/core';
import './style.scss';

export default class Header extends Component {
  render() {
    return (
      <Grid container className={'admin-header'} justify={'flex-start'}>
        <Grid item xs={6} className={'admin-header_item admin-header_breadcrumbs'}>
          <HeaderBreadcrumbs />
        </Grid>
      </Grid>
    );
  }
}
