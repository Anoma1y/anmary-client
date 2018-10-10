import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Modal,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import SizeInfo from '../../components/SizeInfo';
import { changeCurrentSize } from '../../store/actions';
import { amountOutput } from 'lib/amount';
import Storage from 'lib/storage';
import _ from 'lodash';

@connect(({ Shop_Products, Shop_Products_Single }) => ({ Shop_Products, Shop_Products_Single }), ({
  changeCurrentSize
}))
export default class ProductDetail extends Component {

  state = {
    sizeModalOpen: false,
  };

  handleSizeModalOpen = () => {
    this.setState({ sizeModalOpen: true });
  };

  handleSizeModalClose = () => {
    this.setState({ sizeModalOpen: false });
  };

  handleAddToCart = () => {
    const { product, currentSize } = this.props.Shop_Products_Single;
    const { sizes } = this.props.Shop_Products;

    if (!currentSize) {
      this.setState({ cartError: 'Выберите размер' });
      return;
    }

    const cart = Storage.get('cart') || [];

    if (cart) {
      const isProductInCart = _.find(cart, { size: { id: parseInt(currentSize) } }) && _.find(cart, { product: { id: parseInt(product.id) } });

      if (isProductInCart) {
        this.setState({ cartError: 'Выбранный размер уже есть в корзине' });
        return;
      }
    }

    const productCart = {
      product: {
        id: product.id,
        name: product.name,
        article: product.article,
        category: product.category.name,
        brand: product.brand.name,
        is_available: product.is_available,
        price: product.price,
        discount: product.discount,
        total_price: product.total_price,
        image: _.find(product.images, { is_default: true }) || product.images[0]
      },
      size: _.find(sizes, { id: parseInt(currentSize) })
    };

    // Storage.set('cart', [...cart, productCart]);
  };

  render() {
    const { compositions, sizes } = this.props.Shop_Products;
    const { product, currentSize } = this.props.Shop_Products_Single;
    const product_sizes = _.sortBy(product.sizes, [(o) => o.size_id]);

    return (
      <Grid container spacing={40} className={'product-detail-content'}>

        <Grid item xs={12}>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-title'}>
              {product.name.length !== 0 && <span className={'product-detail-content_text product-detail-content-title_name'}>{product.name}</span>}
              <span className={'product-detail-content_text product-detail-content-title_article'}>{product.article}</span>
            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-price'}>

              {
                product.discount !== 0 ? (
                  <div className={'product-detail-content-price_sale'}>
                    <span className={'product-detail-content_text product-detail-content-price_old'}>{amountOutput(product.price).value}</span>
                    <span className={'product-detail-content_text product-detail-content-price_new'}>{amountOutput(product.total_price).value}</span>
                  </div>
                ) : (
                  <span className={'product-detail-content-price_current'}>
                    {amountOutput(product.total_price).value}
                  </span>
                )
              }

            </div>
          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-available'}>
              {
                product.is_available ? (
                  <span className={'product-detail-content-available_text'}>
                    В наличии
                  </span>
                ) : (
                  <span className={'product-detail-content-available_text product-detail-content-available_text__not-available'}>
                    Нет в наличии
                  </span>
                )
              }

            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Категория
              </div>

              <div className={'product-detail-content-info_text'}>
                {product.category.name}
              </div>

            </div>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Бренд
              </div>

              <div className={'product-detail-content-info_text'}>
                {product.brand.name}
              </div>

            </div>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Сезон
              </div>

              <div className={'product-detail-content-info_text'}>
                {product.season.name}
              </div>
            </div>
          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-size'}>

              <Select
                fullWidth
                onChange={(e) => this.props.changeCurrentSize(e.target.value)}
                displayEmpty
                value={currentSize}
              >
                <MenuItem value={''} disabled>Выберите размер</MenuItem>
                {
                  product_sizes.map((size) => {
                    const findSize = _.find(sizes, { id: size.size_id });

                    return (
                      <MenuItem key={findSize.id} value={findSize.id}>
                        {`${findSize.ru} (${findSize.international})`}
                      </MenuItem>
                    );
                  })
                }
              </Select>
            </div>

          </div>

          {
            product.description.length !== 0 && (
              <div className={'product-detail-content_item'}>

                <ExpansionPanel className={'product-detail-content_expansion'}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-detail-content-item_head'}>
                    <span className={'product-detail-content_expansion-title'}>Описание</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={'product-detail-content-item_content'}>
                    {product.description}
                  </ExpansionPanelDetails>
                </ExpansionPanel>

              </div>
            )
          }

          <div className={'product-detail-content_item'}>

            <ExpansionPanel className={'product-detail-content_expansion'}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-detail-content-item_head'}>
                <span className={'product-detail-content_expansion-title'}>Состав</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={'product-detail-content-item_content'}>
                <div className={'product-detail-content-composition_list'}>
                  {
                    product.compositions.map((composition) => {
                      return (
                        <span
                          key={composition.id}
                          className={'product-detail-content-composition_item'}
                        >
                          {_.find(compositions, { id: composition.composition_id }).name} - {composition.value}%
                        </span>
                      );
                    })
                  }
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>

          <div className={'product-detail-content_item'}>
            <Grid container spacing={40} justify={'space-around'}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <button
                  className={'product-detail-content_btn product-detail-content_btn__add-to-cart'}
                  onClick={this.handleAddToCart}
                >
                  Добавить в корзину
                </button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <button
                  className={'product-detail-content_btn product-detail-content_btn__add-to_favorite'}
                >
                  Отложить
                </button>
              </Grid>
            </Grid>
          </div>

        </Grid>

      </Grid>
    );
  }
}
