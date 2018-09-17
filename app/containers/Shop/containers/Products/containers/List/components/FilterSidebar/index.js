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

@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }))
export default class FilterSidebar extends Component {
  render() {
    return (
      <div className={'product-filter-sidebar'}>

        <div className={'product-filter-sidebar-item'}>
          <ExpansionPanel className={'product-filter-sidebar_expansion'}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-filter-sidebar-item_head'}>
              <span className={'product-filter-sidebar-item_header-text'}>Категория</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={'product-filter-sidebar-item_content'}>

              <List className={'product-filter-sidebar-list'}>
                {
                  this.props.Shop_Products.categories.map((category) => (
                    <ListItem button key={category.id} className={'product-filter-sidebar-list_item'}>
                      <ListItemText primary={category.name} className={'product-filter-sidebar-list_text'} />
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
                    <ListItem button key={brand.id} className={'product-filter-sidebar-list_item'}>
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
                    <ListItem button key={season.id} className={'product-filter-sidebar-list_item'}>
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
                    <ListItem button key={size.id} className={'product-filter-sidebar-list_item'}>
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
                    <ListItem button key={composition.id} className={'product-filter-sidebar-list_item'}>
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
                  value={this.props.Shop_Products_List.filter_price.min}
                />
              </Grid>
              <Grid item xs={6} className={'product-filter-sidebar-price-range_item'}>
                <TextField
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatNegative,
                  }}
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
