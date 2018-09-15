import React, { Component } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import ProductImage from './components/ProductImage';
import ProductDetail from './components/ProductDetail';

export default class Single extends Component {

  state = {
    ready: true // todo: true -> false
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => (

    <Grid item xs={12} className={'container'}>

      <Grid container spacing={40} className={'product-detail'}>

        <Grid item xs={6} className={'product-detail_column product-detail-left'}>

          <ProductImage />

        </Grid>

        <Grid item xs={6} className={'product-detail_column product-detail-right'}>

          <ProductDetail />

        </Grid>

      </Grid>

    </Grid>
  )

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
