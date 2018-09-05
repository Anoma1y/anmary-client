import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Categories from './containers/Categories';
import './style.scss';

export default class Admin extends Component {
  render() {
    return (
      <Grid container className={'admin'}>
        <Switch>
          <Route exact path={`${this.props.match.url}/categories`} component={Categories} />
        </Switch>
      </Grid>
    );
  }
}
