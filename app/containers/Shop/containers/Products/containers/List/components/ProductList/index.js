import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import { Favorite as FavoriteIcon } from '@material-ui/icons';

export default class ProductList extends Component {

  renderItem = (d) => {
    const id = d;

    return (
      <Grid item xs={12} sm={6} md={4} lg={4} key={d} className={'product-list_item'}>
        <div className={'product-card'}>
          <div className={'product-card_img'}>
            <img src={'https://qfos.ru/wp-content/uploads/2018/04/Aog6.jpg'} alt={'IMG-PRODUCT'} />

            <Link to={`/product/${id}`} className={'product-card_learn-more'}>
              Подробнее
            </Link>
          </div>

          <div className={'product-card-content'}>
            <div className={'product-card-info'}>
              <Link to={`/product/${id}`} className={'product-card_name'}>
                Converse All Star Hi Plimsolls
              </Link>

              <div className={'product-card_price'}>
                <span className={'product-card_price__old'}>4 275 руб.</span>
                <span className={'product-card_price__new'}>4 750 руб.</span>
              </div>

              <div className={'product-card_discount'}>
                -10%
              </div>

            </div>
            <div className={'product-card_favorite'}>
              <FavoriteIcon />
            </div>
          </div>
        </div>
      </Grid>
    )
  }

  render() {
    return (
      <Grid container spacing={40} className={'product-list'}>

        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((d) => this.renderItem(d))
        }

      </Grid>
    );
  }
}
