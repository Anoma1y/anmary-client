import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './style.scss';

export default class Admin extends Component {
  render() {
    return (
      <Grid container className={'admin'}>
        test
        {/*<Switch>*/}
          {/*<Route exact path={`${this.props.match.url}`} component={Signin} />*/}
          {/*<Route exact path={`${this.props.match.url}/signin`} component={Signin} />*/}
        {/*</Switch>*/}
      </Grid>
    );
  }
}
