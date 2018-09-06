import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import Form from './containers/Form';
import List from './containers/List';
import { pullSchema } from './store/actions';
import './style.scss';

@connect(null, ({ pullSchema }))
export default class Role extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    this.props.pullSchema()
      .then(() => this.setState({ ready: true }));
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => (
    <Grid container className={'admin users'}>
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={List} />
        <Route exact path={`${this.props.match.url}/new`} component={Form} />
        <Route exact path={`${this.props.match.url}/:id/edit`} component={Form} />
      </Switch>
    </Grid>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
