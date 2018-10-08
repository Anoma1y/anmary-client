import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  CircularProgress,
} from '@material-ui/core';
import {
  pullProducts,
  resetProductsList,
  resetFilter
} from './store/actions';
import FilterSidebar from './components/FilterSidebar';
import FilterHeader from './components/FilterHeader';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

@connect(({ routing, Shop_Products, Shop_Products_List }) => ({ routing, Shop_Products, Shop_Products_List }), ({
  pullProducts,
  resetProductsList,
  resetFilter
}))
export default class List extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    this.initialData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.routing.location.search !== prevProps.routing.location.search) {
      this.initialData();
    }
  }

  componentWillUnmount() {
    this.props.resetProductsList();
  }

  initialData = () => {
    const { search } = this.props.routing.location;

    this.props.pullProducts(search)
      .then(() => this.setState({ ready: true }))
      .catch(() => this.setState({ ready: true }));
  };

  renderLoader = () => <CircularProgress size={24} className={'product-content_loading'} />;

  renderContent = () => (
    <Grid item xs={12} className={'container'}>

      <Grid container spacing={40}>

        <Grid item xs={12} sm={12} md={3} lg={3}>

          <FilterSidebar />

        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={9}>

          <Grid container>
            <Grid item xs={12}>

              <FilterHeader />

            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} className={'product-content'}>

              {
                this.state.ready ? <ProductList /> : this.renderLoader()
              }

            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>

              <Pagination />

            </Grid>
          </Grid>

        </Grid>

      </Grid>

    </Grid>
  )

  render() {
    return this.renderContent();
  }

}
