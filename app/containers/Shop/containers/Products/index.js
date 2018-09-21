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
  setStorageData,
  resetProducts,
} from './store/actions';
import moment from 'moment';
import Storage from 'lib/storage';
import './style.scss';

@connect(null, ({
  pullBrands,
  pullCategories,
  pullSizes,
  pullCompositions,
  pullSeasons,
  setStorageData,
  resetProducts,
}))
export default class Products extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    if (Storage.check('product_last_update')) {
      const last_update_time = Storage.get('product_last_update');

      const current_time = moment().unix();
      const cache_time = 2 * 60;

      if ((current_time - last_update_time) < cache_time) {
        this.props.setStorageData()
          .then(() => this.setState({ ready: true }))
          .catch(() => this.initialData());
        return;
      }
      this.initialData();
      return;
    }
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
      .then(() => {
        Storage.set('product_last_update', moment().unix());
        this.setState({ ready: true });
      });
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
