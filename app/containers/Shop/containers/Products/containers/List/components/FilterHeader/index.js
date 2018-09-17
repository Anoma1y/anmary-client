import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Select,
} from '@material-ui/core';
import { changeFilterSort } from '../../store/actions';

@connect(({ Shop_Products_List }) => ({ Shop_Products_List }), ({
  changeFilterSort
}))
export default class FilterHeader extends Component {

  handleSortingChange = (e) => this.props.changeFilterSort(e.target.value);

  render() {
    const {
      page,
      num_on_page,
      total_records,
      products: {
        length: items_on_page
      }
    } = this.props.Shop_Products_List;
    const currentPage = page + 1;
    const fromPage = (num_on_page * (currentPage - 1)) + 1;
    const toPage = (fromPage - 1) + items_on_page;

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
              <option className={'product-filter-header-select_option'} value={1}>По дате (сначало новые)</option>
              <option className={'product-filter-header-select_option'} value={2}>По дате (сначало старые)</option>
              <option className={'product-filter-header-select_option'} value={3}>По скидкам</option>
              <option className={'product-filter-header-select_option'} value={4}>По цене (по убыванию)</option>
              <option className={'product-filter-header-select_option'} value={5}>По цене (по возрастанию)</option>
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
