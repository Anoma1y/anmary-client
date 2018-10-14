import React, { Component } from 'react';
import './style.scss';
import {
  Grid,
  Button,
  Input,
} from '@material-ui/core';
import Storage from 'lib/storage';
import { amountOutput } from 'lib/amount';

export default class Cart extends Component {

  renderItems = (item) => (
    <tr key={item.product.id} className={'cart-table-shopping-cart_row cart-table-shopping-cart_row_content'}>
      <td className={'cart-table-shopping-cart_column cart-table-shopping-cart_column__product'}>
        <div className={'cart-table-shopping-cart-image'}>
          <img src={`${process.env.API_HOST}${item.product.image.original_uri}`} alt={'Cart Image'} />
        </div>
      </td>
      <td className={'cart-table-shopping-cart_column cart-table-shopping-cart_column__name'}>
        {
          item.product.name.length !== 0
            ? `${item.product.name} ${item.product.article}`
            : `${item.product.category} ${item.product.article}`
        }
      </td>
      <td className={'cart-table-shopping-cart_column cart-table-shopping-cart_column__additional'}>
        {item.product.brand}
      </td>
      <td className={'cart-table-shopping-cart_column cart-table-shopping-cart_column__size'}>
        {item.size.ru} ({item.size.international})
      </td>
      <td className={'cart-table-shopping-cart_column cart-table-shopping-cart_column__price'}>
        {amountOutput(item.product.total_price).value} руб.
      </td>
    </tr>
  );

  render() {

    const CART_ITEMS = Storage.get('cart');

    return (
      <section className={'cart'}>
        <Grid item xs={12} className={'container'}>
          <Grid container spacing={40}>

            <Grid item xs={12} sm={8} md={8} lg={8}>

              <div className={'cart-content'}>

                <div className={'cart-content-wrapper'}>
                  <div className={'cart-shopping-cart-wrapper'}>
                    <table className={'cart-table-shopping-cart'}>
                      <tbody>
                        <tr className={'cart-table-shopping-cart_row cart-table-shopping-cart-head'}>
                          <th className={'cart-table-shopping-cart-head_column'} />
                          <th className={'cart-table-shopping-cart-head_column'}>Товар</th>
                          <th className={'cart-table-shopping-cart-head_column'}>Бренд</th>
                          <th className={'cart-table-shopping-cart-head_column'}>Размер</th>
                          <th className={'cart-table-shopping-cart-head_column'}>Цена</th>
                        </tr>
                        {CART_ITEMS.map((item) => this.renderItems(item))}
                      </tbody>
                    </table>
                  </div>
                  <div className={'cart-additional'}>
                    <div className={'cart-additional-test'}>

                    </div>

                    <div className={'cart-additional-refresh'}>
                      <Button
                        variant={'raised'}
                      >
                        Обновить корзину
                      </Button>
                    </div>
                  </div>

                </div>

              </div>

            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>

              <div className={'cart-order'}>

                <div className={'cart-order_header'}>
                  Оформление заказа
                </div>

                <div className={'cart-order-wrapper'}>

                  <div className={'cart-order-item'}>

                    <div className={'cart-order-item_title'}>
                      Общая сумма
                    </div>

                    <div className={'cart-order-item_content'}>
                      <span>
                        7200 руб.
                      </span>
                    </div>

                  </div>

                  <div className={'cart-order-item'}>

                    <div className={'cart-order-item_title'}>
                      Информация о Вас
                    </div>

                    <div className={'cart-order-item_content'}>

                      <div className={'cart-order-user-info'}>

                        <Input
                          fullWidth
                          label={'ФИО'}
                        />

                        <Input
                          fullWidth
                          label={'Телефон'}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </Grid>

          </Grid>
        </Grid>
      </section>
    );
  }
}
