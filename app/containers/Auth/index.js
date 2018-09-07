import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Signin from './containers/Signin';
import './style.scss';

export default class Auth extends Component {
  render() {
    return (
      <Grid container className={'auth'}>
        <Switch>
          <Route exact path={`${this.props.match.url}`} component={Signin} />
          <Route exact path={`${this.props.match.url}/signin`} component={Signin} />
        </Switch>
      </Grid>
    );
  }
}
