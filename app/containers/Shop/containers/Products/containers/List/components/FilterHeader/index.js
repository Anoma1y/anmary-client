import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Select,
} from '@material-ui/core';
import {
  changeFilterSort,
  applyFilter
} from '../../store/actions';
import Sorting from 'lib/sorting';

@connect(({ Shop_Products_List }) => ({ Shop_Products_List }), ({
  changeFilterSort,
  applyFilter
}))
export default class FilterHeader extends Component {

  handleSortingChange = (e) => {
    const { value } = e.target;

    this.props.changeFilterSort(value);
    this.props.applyFilter(0, 9, value);
  };

  render() {
    const {
      page,
      num_on_page,
      total_records,
      products
    } = this.props.Shop_Products_List;

    const currentPage = page + 1;
    const fromPage = (num_on_page * (currentPage - 1)) + 1;
    const toPage = (fromPage - 1) + (products.length);

    return (
      <div className={'product-filter-header'}>

        <Grid container justify={'space-between'} className={'product-filter-header_container'}>

          <Grid item xs={4} className={'product-filter-header_item product-filter-header_item__left'}>

            <Select
              autoWidth
              value={this.props.Shop_Products_List.sorting}
              native
              onChange={this.handleSortingChange}
              className={'product-filter-header-select product-filter-header_sort'}
            >
              {
                Sorting.map((sort) => (
                  <option
                    key={sort.id}
                    value={sort.id}
                    className={'product-filter-header-select_option'}
                  >
                    {sort.label}
                  </option>
                ))
              }
            </Select>

          </Grid>

          <Grid item xs={4} className={'product-filter-header_item product-filter-header_item__right'}>
            <span className={'product-filter-header_count-items'}>Показано с {fromPage} по {toPage} из {total_records}</span>
          </Grid>

        </Grid>

      </div>
    );
  }
}
