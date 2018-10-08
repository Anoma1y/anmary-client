import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import ProductImage from './components/ProductImage';
import ProductDetail from './components/ProductDetail';
import {
  pullProduct,
  resetProductSingle
} from './store/actions';

@connect(null, ({
  pullProduct,
  resetProductSingle
}))
export default class Single extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.pullProduct(id)
      .then(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetProductSingle();
  }

  renderLoader = () => <CircularProgress size={24} className={'shop_loading'} />;

  renderContent = () => (

    <Grid item xs={12} className={'container'}>

      <Grid container spacing={40} className={'product-detail'}>

        <Grid item xs={12} sm={6} md={6} lg={6} className={'product-detail_column product-detail-left'}>

          <ProductImage />

        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} className={'product-detail_column product-detail-right'}>

          <ProductDetail />

        </Grid>

      </Grid>

    </Grid>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
