import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
// import Form from './containers/Form';
import List from './containers/List';
// import Single from './containers/Single';
import {
  pullBrands,
  pullCategories,
  pullCompositions,
  pullSeasons,
  pullSizes
} from './store/actions';
import './style.scss';

@connect(({ routing }) => ({ routing }), ({
  pullBrands,
  pullCategories,
  pullCompositions,
  pullSeasons,
  pullSizes
}))
export default class Operations extends Component {

  state = {
    ready: true
  };

  componentDidMount() {
    this.initialData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.routing.location.pathname !== prevProps.routing.location.pathname) {
      this.initialData();
    }
  }

  initialData = () => {
    Promise.all([
      this.props.pullBrands(),
      this.props.pullCategories(),
      this.props.pullCompositions(),
      this.props.pullSeasons(),
      this.props.pullSizes(),
    ])
      .then(() => this.setState({ ready: true }));
  };

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderContent = () => (
    <Grid container className={'admin product'}>
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={List} />
        {/*<Route exact path={`${this.props.match.url}/new`} component={Form} />*/}
        {/*<Route exact path={`${this.props.match.url}/:id/edit`} component={Form} />*/}
        {/*<Route exact path={`${this.props.match.url}/:id`} component={Single} />*/}
      </Switch>
    </Grid>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
