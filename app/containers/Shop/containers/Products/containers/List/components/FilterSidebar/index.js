import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import SidebarFilterPanel from '../SidebarFilterPanel';
import NumberFormatNegative from 'containers/Shop/components/NumberFormatNegative';
import {
  changeFilterPrice,
  resetFilter,
  applyFilter,
} from '../../store/actions';

// todo: добавить закрытие всех панелей после сброса
@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }), ({
  changeFilterPrice,
  resetFilter,
  applyFilter,
}))
export default class FilterSidebar extends Component {

  handleChangePrice = (event, key) => {
    const {
      filter_price: { min, max }
    } = this.props.Shop_Products_List;
    const { value } = event.target;

    if ((key === 'min' && (Number(value) > Number(max))) || (key === 'max' && (Number(value) < Number(min)))) {
      return;
    }

    this.props.changeFilterPrice(key, value);
  };

  render() {
    return (
      <div className={'product-filter-sidebar'}>

        <div className={'product-filter-sidebar-item'}>
          <SidebarFilterPanel
            data={this.props.Shop_Products.categories}
            dataItem={'category'}
            label={'Категория'}
          />
        </div>

        <div className={'product-filter-sidebar-item'}>
          <SidebarFilterPanel
            data={this.props.Shop_Products.brands}
            dataItem={'brand'}
            label={'Бренд'}
          />
        </div>

        <div className={'product-filter-sidebar-item'}>
          <SidebarFilterPanel
            data={this.props.Shop_Products.seasons}
            dataItem={'season'}
            label={'Сезон'}
          />
        </div>

        <div className={'product-filter-sidebar-item'}>

          <SidebarFilterPanel
            data={this.props.Shop_Products.sizes}
            dataItem={'size'}
            label={'Размер'}
            alterName={{
              main: 'ru',
              additional: 'international'
            }}
          />

        </div>

        <div className={'product-filter-sidebar-item'}>

          <SidebarFilterPanel
            data={this.props.Shop_Products.compositions}
            dataItem={'composition'}
            label={'Состав'}
          />

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
                onClick={() => this.props.applyFilter(0)}
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
