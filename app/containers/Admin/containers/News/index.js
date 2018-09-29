import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Form from './containers/Form';
import List from './containers/List';
import Single from './containers/Single';
import './style.scss';

export default ({ match }) => (
  <Grid container className={'admin news'}>
    <Switch>
      <Route exact path={`${match.url}`} component={List} />
      <Route exact path={`${match.url}/new`} component={Form} />
      <Route exact path={`${match.url}/:id/edit`} component={Form} />
      <Route exact path={`${match.url}/:id`} component={Single} />
    </Switch>
  </Grid>
)
