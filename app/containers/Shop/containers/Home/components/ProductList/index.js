import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid
} from '@material-ui/core';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import { amountOutput } from 'lib/amount';
import _ from 'lodash';

@connect(({ Shop_Home }) => ({ Shop_Home }))
export default class ProductList extends Component {

  renderItem = (product) => {
    const HOST = process.env.API_HOST;
    const { id, images, category, name, article, price, discount, total_price } = product;
    const mainImage = _.find(images, { is_default: true }) || images[0];

    return (
      <Grid item xs={12} sm={4} md={3} lg={3} key={product.id} className={'product-list_item'}>
        <div className={'product-card'}>
          <div className={'product-card_img'}>
            <img src={`${HOST}${mainImage.original_uri}`} alt={'Product'} />
            <Link to={`/product/${id}`} className={'product-card_learn-more'}>
              Подробнее
            </Link>
          </div>
          <div className={'product-card-content'}>
            <div className={'product-card-info'}>
              <Link to={`/product/${id}`} className={'product-card_name'}>
                {
                  name.length === 0 ? category.name : name
                } {article}
              </Link>

              <div className={'product-card_price'}>
                {
                  discount === 0 ? (
                    <span className={'product-card_price__current'}>{amountOutput(price).value}</span>
                  ) : (
                    <React.Fragment>
                      <span className={'product-card_price__old'}>{amountOutput(price).value}</span>
                      <span className={'product-card_price__new'}>{amountOutput(total_price).value}</span>
                    </React.Fragment>
                  )
                }
              </div>
              {
                discount !== 0 && (
                  <div className={'product-card_discount'}>
                    -{discount}%
                  </div>
                )
              }
            </div>
            <div className={'product-card_favorite'}>
              <FavoriteIcon />
            </div>
          </div>
        </div>
      </Grid>
    );
  };

  render() {
    const { products } = this.props.Shop_Home;

    return (
      <Grid container spacing={40} className={'product-list'}>
        {
          products.map((product) => this.renderItem(product))
        }
      </Grid>
    );
  }
}
