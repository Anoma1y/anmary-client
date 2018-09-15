import React, { Component } from 'react';
import {
  Grid,
  Select,
} from '@material-ui/core';

export default class FilterHeader extends Component {

  render() {
    return (
      <div className={'product-filter-header'}>

        <Grid container justify={'space-between'} className={'product-filter-header_container'}>

          <Grid item xs={4} className={'product-filter-header_item product-filter-header_item__left'}>

            <Select
              autoWidth
              value={10}
              native
              className={'product-filter-header-select product-filter-header_sort'}
            >
              <option className={'product-filter-header-select_option'} value={10}>По новизне</option>
              <option className={'product-filter-header-select_option'} value={20}>По скидкам</option>
              <option className={'product-filter-header-select_option'} value={30}>По убыванию цены</option>
              <option className={'product-filter-header-select_option'} value={40}>По возрастанию цены</option>
            </Select>

          </Grid>

          <Grid item xs={4} className={'product-filter-header_item product-filter-header_item__right'}>
            <span className={'product-filter-header_count-items'}>Показано с 1 по 10 из 20 </span>
          </Grid>

        </Grid>

      </div>
    );
  }
}
