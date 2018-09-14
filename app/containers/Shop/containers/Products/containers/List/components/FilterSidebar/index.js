import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid
} from '@material-ui/core';
import NumberFormatNegative from 'containers/Shop/components/NumberFormatNegative';

@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }))
export default class FilterSidebar extends Component {
  render() {
    return (
      <div className={'product-filter'}>

        <div className={'product-filter-item'}>
          <div className={'product-filter-item_head'}>
            <span className={'product-filter-item_header-text'}>Категории</span>
          </div>
          <div className={'product-filter-item_content'}>
            <List className={'product-filter-list'}>
              {
                this.props.Shop_Products.categories.map((category) => (
                  <ListItem button key={category.id} className={'product-filter-list_item'}>
                    <ListItemText primary={category.name} className={'product-filter-list_text'} />
                  </ListItem>
                ))
              }
            </List>
          </div>
        </div>

        <div className={'product-filter-item'}>
          <div className={'product-filter-item_head'}>
            <span className={'product-filter-item_header-text'}>Бренды</span>
          </div>
          <div className={'product-filter-item_content'}>
            <List className={'product-filter-list'}>
              {
                this.props.Shop_Products.brands.map((brand) => (
                  <ListItem button key={brand.id} className={'product-filter-list_item'}>
                    <ListItemText primary={brand.name} className={'product-filter-list_text'} />
                  </ListItem>
                ))
              }
            </List>
          </div>
        </div>

        <div className={'product-filter-item'}>
          <div className={'product-filter-item_head'}>
            <span className={'product-filter-item_header-text'}>Сезоны</span>
          </div>
          <div className={'product-filter-item_content'}>
            <List className={'product-filter-list'}>
              {
                this.props.Shop_Products.seasons.map((season) => (
                  <ListItem button key={season.id} className={'product-filter-list_item'}>
                    <ListItemText primary={season.name} className={'product-filter-list_text'} />
                  </ListItem>
                ))
              }
            </List>
          </div>
        </div>

        <div className={'product-filter-item'}>
          <div className={'product-filter-item_head'}>
            <span className={'product-filter-item_header-text'}>Цена</span>
          </div>
          <div className={'product-filter-item_content'}>

            <Grid container spacing={40}>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatNegative,
                  }}
                  value={this.props.Shop_Products_List.initRangePrice.min}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatNegative,
                  }}
                  value={this.props.Shop_Products_List.initRangePrice.max}
                />
              </Grid>
            </Grid>

          </div>
        </div>

      </div>
    );
  }
}
