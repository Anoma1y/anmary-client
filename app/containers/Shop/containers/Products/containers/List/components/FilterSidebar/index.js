import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import NumberFormatNegative from 'containers/Shop/components/NumberFormatNegative';
import {
  changeFilterPrice,
  changeFilterCategoryId,
  changeFilterBrandId,
  changeFilterSeasonId,
  changeFilterCompositionId,
  changeFilterSizeId,
  resetFilter
} from '../../store/actions';
import _ from 'lodash';

@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }), ({
  changeFilterPrice,
  changeFilterCategoryId,
  changeFilterBrandId,
  changeFilterSeasonId,
  changeFilterCompositionId,
  changeFilterSizeId,
  resetFilter
}))
export default class FilterSidebar extends Component {

  handleFilterDebounce = _.debounce(() => {
    console.log('apply filter');
  }, 1000);

  handleChangePrice = (event, key) => {
    const {
      filter_price: { min, max }
    } = this.props.Shop_Products_List;
    const { value } = event.target;

    if ((key === 'min' && (Number(value) > Number(max))) || (key === 'max' && (Number(value) < Number(min)))) {
      return;
    }

    this.props.changeFilterPrice(key, value);
    // this.handleFilterDebounce();
  };

  render() {
    const {
      category_id,
      brand_id,
      season_id,
      size_id,
      composition_id,
    } = this.props.Shop_Products_List;

    return (
      <div className={'product-filter-sidebar'}>

        <div className={'product-filter-sidebar-item'}>
          <ExpansionPanel className={'product-filter-sidebar_expansion'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
              <span className={'product-filter-sidebar-item_header-text'}>Категория</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

              <List className={'product-filter-sidebar-list'} component="nav">
                {
                  this.props.Shop_Products.categories.map((category) => (
                    <ListItem
                      button
                      key={category.id}
                      onClick={() => this.props.changeFilterCategoryId(category.id)}
                      className={`product-filter-sidebar-list_item${category_id === category.id ? ' product-filter-sidebar-list_item__selected' : ''}`}
                    >
                      <ListItemText
                        primary={category.name}
                        className={'product-filter-sidebar-list_text'}
                      />
                    </ListItem>
                  ))
                }
              </List>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div className={'product-filter-sidebar-item'}>
          <ExpansionPanel className={'product-filter-sidebar_expansion'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
              <span className={'product-filter-sidebar-item_header-text'}>Бренд</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

              <List className={'product-filter-sidebar-list'}>
                {
                  this.props.Shop_Products.brands.map((brand) => (
                    <ListItem
                      button
                      key={brand.id}
                      onClick={() => this.props.changeFilterBrandId(brand.id)}
                      className={`product-filter-sidebar-list_item${brand_id === brand.id ? ' product-filter-sidebar-list_item__selected' : ''}`}
                    >
                      <ListItemText primary={brand.name} className={'product-filter-sidebar-list_text'} />
                    </ListItem>
                  ))
                }
              </List>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div className={'product-filter-sidebar-item'}>
          <ExpansionPanel className={'product-filter-sidebar_expansion'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
              <span className={'product-filter-sidebar-item_header-text'}>Сезон</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

              <List className={'product-filter-sidebar-list'}>
                {
                  this.props.Shop_Products.seasons.map((season) => (
                    <ListItem
                      button
                      key={season.id}
                      onClick={() => this.props.changeFilterSeasonId(season.id)}
                      className={`product-filter-sidebar-list_item${season_id === season.id ? ' product-filter-sidebar-list_item__selected' : ''}`}
                    >
                      <ListItemText primary={season.name} className={'product-filter-sidebar-list_text'} />
                    </ListItem>
                  ))
                }
              </List>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div className={'product-filter-sidebar-item'}>

          <ExpansionPanel className={'product-filter-sidebar_expansion'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
              <span className={'product-filter-sidebar-item_header-text'}>Размер</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

              <List className={'product-filter-sidebar-list'}>
                {
                  this.props.Shop_Products.sizes.map((size) => (
                    <ListItem
                      button
                      key={size.id}
                      onClick={() => this.props.changeFilterSizeId(size.id)}
                      className={`product-filter-sidebar-list_item${size_id === size.id ? ' product-filter-sidebar-list_item__selected' : ''}`}
                    >
                      <ListItemText primary={`${size.ru} (${size.international})`} className={'product-filter-sidebar-list_text'} />
                    </ListItem>
                  ))
                }
              </List>

            </ExpansionPanelDetails>
          </ExpansionPanel>

        </div>

        <div className={'product-filter-sidebar-item'}>

          <ExpansionPanel className={'product-filter-sidebar_expansion'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
              <span className={'product-filter-sidebar-item_header-text'}>Состав</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

              <List className={'product-filter-sidebar-list'}>
                {
                  this.props.Shop_Products.compositions.map((composition) => (
                    <ListItem
                      button
                      key={composition.id}
                      onClick={() => this.props.changeFilterCompositionId(composition.id)}
                      className={`product-filter-sidebar-list_item${composition_id === composition.id ? ' product-filter-sidebar-list_item__selected' : ''}`}
                    >
                      <ListItemText primary={composition.name} className={'product-filter-sidebar-list_text'} />
                    </ListItem>
                  ))
                }
              </List>

            </ExpansionPanelDetails>
          </ExpansionPanel>

        </div>

        <div className={'product-filter-sidebar-item'}>
          <div className={'product-filter-sidebar-item_head product-filter-sidebar-item_head__price'}>
            <span className={'product-filter-sidebar-item_header-text product-filter-sidebar-item_header-text__price'}>Цена</span>
          </div>
          <div className={'product-filter-sidebar-item_content product-filter-sidebar-item_content__price'}>

            <Grid container spacing={40} className={'product-filter-sidebar-price-range'}>

              <Grid item xs={6} className={'product-filter-sidebar-price-range_item'}>
                <TextField
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatNegative,
                  }}
                  onChange={(e) => this.handleChangePrice(e, 'min')}
                  value={this.props.Shop_Products_List.filter_price.min}
                />
              </Grid>
              <Grid item xs={6} className={'product-filter-sidebar-price-range_item'}>
                <TextField
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatNegative,
                  }}
                  onChange={(e) => this.handleChangePrice(e, 'max')}
                  value={this.props.Shop_Products_List.filter_price.max}
                />
              </Grid>
            </Grid>

          </div>
        </div>

        <div className={'product-filter-sidebar-control'}>

          <Grid container spacing={16} className={'product-filter-sidebar-control_content'}>

            <Grid item xs={6} className={'product-filter-sidebar-control_btn'}>
              <Button
                fullWidth
                color={'primary'}
                variant={'raised'}
              >
                Применить
              </Button>
            </Grid>

            <Grid item xs={6} className={'product-filter-sidebar-control_btn'}>
              <Button
                fullWidth
                variant={'raised'}
                onClick={this.props.resetFilter}
              >
                Сбросить
              </Button>
            </Grid>

          </Grid>

        </div>

      </div>
    );
  }
}
