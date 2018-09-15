import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import List from './containers/List';
import Single from './containers/Single';
import {
  pullBrands,
  pullCategories,
  pullCompositions,
  pullSizes,
  pullSeasons,
  resetProducts,
} from './store/actions';
import './style.scss';

@connect(null, ({
  pullBrands,
  pullCategories,
  pullSizes,
  pullCompositions,
  pullSeasons,
  resetProducts,
}))
export default class Products extends Component {
  state = {
    ready: true
  };

  componentDidMount() {
    this.initialData();
  }

  componentWillUnmount() {
    this.props.resetProducts();
  }

  initialData = () => {
    Promise.all([
      this.props.pullBrands(),
      this.props.pullCategories(),
      this.props.pullSeasons(),
      this.props.pullSizes(),
      this.props.pullCompositions(),
    ])
      .then(() => this.setState({ ready: true }));
  };

  renderLoader = () => <CircularProgress size={24} className={'shop_loading'} />;

  renderContent = () => (
    <Grid container className={'shop product'}>
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={List} />
        <Route exact path={`${this.props.match.url}/:id`} component={Single} />
      </Switch>
    </Grid>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
