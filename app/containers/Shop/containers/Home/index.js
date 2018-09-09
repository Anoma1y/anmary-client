import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import {
  Grid,
  Button
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Carousel
            autoplay
            autoplayInterval={3000}
            initialSlideHeight={800}
            pauseOnHover={false}
            renderCenterRightControls={() => null}
            renderCenterLeftControls={() => null}
            renderBottomCenterControls={() => null}
            transitionMode={'fade'}
            wrapAround
          >
            <img src={'/static/images/home_slider_1.jpg'} />
            <img src={'/static/images/home_slider_1.jpg'} />
            <img src={'/static/images/home_slider_1.jpg'} />
          </Carousel>
        </Grid>

        <Grid item xs={12}>

          <section id="blocks-info">
            <div className="blocks">
              <div className="block new_collections">
                <div className="collection_info">
                  <div className="collection_name">
                    <h2>Осень/Зима</h2>
                    <h2>2017/2018</h2>
                    <p>Новое поступление</p>
                  </div>
                  <a href={''} className={'block_link'}>Смотреть коллекцию</a>
                </div>
                <div className="overlay" />
              </div>
              <div className="block season_sale">
                <a href={'#'} className="season_sale_info">
                  <p>Сезонная распродажа</p>
                  <h1>Sale</h1>
                </a>
              </div>
              <div className="block new_arrivals">
                <div className="overlay" />
                <div className="arrivals_info">
                  <h1>Последнее поступление</h1>
                  <a href={'#'} className={'block_link'}>Смотреть</a>
                </div>
              </div>
              <div className="block subscribe">
                <div className="overlay" />
                <div className="get_subscribe">
                  <h2>Подписаться на рассылку</h2>
                </div>
                <div className="formSubscribe">
                  <input
type="text" placeholder="Введите E-Mail" id="get_subscribe_email"
                         name="get_subscribe_email" />
                  <button id="get_subscribe_btn" name="get_subscribe_btn"><i className="fa fa-plus" /></button>
                  <span id="error-subscribe" />
                </div>
              </div>
              <div className="block all_catalog">
                <div className="overlay" />
                <div className="catalog_info">
                  <h2>Большой выбор женской одежды</h2>
                </div>
                <a href={'#'} className={'block_link'}>Перейти в каталог</a>
              </div>
            </div>
          </section>

        </Grid>

        <Grid item xs={12} className={'container'}>

          <Grid container className={'new-products'}>
            <Grid item xs={12}>
              <div className={'section-title-container'}>
                <div className={'section_subtitle'}>только лучшее</div>
                <div className={'section_title'}>новое поступление</div>
              </div>
            </Grid>
            <Grid item xs={12} className={'new-products_list'}>

              <Grid container spacing={24}>
                <Grid item xs={12} sm={6} md={3} className={'new-products_item'}>
                  <div className="product-item">
                    <div className="shadow" />
                    <div className={'product-item_image'} style={{ background: 'url(https://i.pinimg.com/originals/32/d8/fe/32d8fea5ce212f8c76f894c60a909487.jpg) no-repeat 50% 100%', backgroundSize: 'cover' }}></div>
                    <div className="image_overlay" />
                    <div className="add_to_cart product_opacity product-add-to-cart">
                      Добавить в карзину
                    </div>
                    <div className="add_to_compare product_opacity">Отложить</div>
                    <div className="product-info">
                      <div className="info-container">
                        <div className="info-container-header">
                          <div className="product-name">
                            <a href={''}>
                              <p className="product-title">Название</p>
                              <p className="product-brand">Бренд</p>
                            </a>
                          </div>
                          <div className="product-price">
                            <p className={'product-price__current'}>48 000<span className="rub-sign">Р</span></p>
                          </div>
                        </div>
                        <div className="product-hide-info">
                          <strong>Размер</strong>
                          <div className="product-size">
                            24, 44, 56
                          </div>
                          <strong>Состав</strong>
                          <div className="product-compositions">
                            какашки
                            еще какашки
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={'new-products_item'}>

                  <div className="product-item">
                    <div className="shadow" />
                    <div className={'product-item_image'} style={{ background: 'url(https://cdn.shopify.com/s/files/1/0932/7274/products/linen_dresses_fantasylinen2.jpg?v=1520755946) no-repeat 50% 100%', backgroundSize: 'cover' }}></div>
                    <div className="image_overlay" />
                    <div className="add_to_cart product_opacity product-add-to-cart">
                        Добавить в карзину
                    </div>
                    <div className="add_to_compare product_opacity">Отложить</div>
                    <div className="product-info">
                      <div className="info-container">
                        <div className="info-container-header">
                          <div className="product-name">
                            <a href={''}>
                              <p className="product-title">Название</p>
                              <p className="product-brand">Бренд</p>
                            </a>
                          </div>
                          <div className="product-price">
                            <p className={'product-price__old'}>48 000<span className="rub-sign">Р</span></p>
                            <p className={'product-price__new'}>37 999<span className="rub-sign">Р</span></p>
                          </div>
                        </div>
                        <div className="product-hide-info">
                          <strong>Размер</strong>
                          <div className="product-size">
                              24, 44, 56
                          </div>
                          <strong>Состав</strong>
                          <div className="product-compositions">
                              какашки
                              еще какашки
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </Grid>
                <Grid item xs={12} sm={6} md={3} className={'new-products_item'} >
                  <div className="product-item">
                    <div className="shadow" />
                    <div className={'product-item_image'} style={{ background: 'url(http://www.mode-beaute.info/wp-content/uploads/2017/03/v%C3%AAtements-grande-taille-femme.jpg) no-repeat 50% 100%', backgroundSize: 'cover' }}></div>
                    <div className="image_overlay" />
                    <div className="add_to_cart product_opacity product-add-to-cart">
                      Добавить в карзину
                    </div>
                    <div className="add_to_compare product_opacity">Отложить</div>
                    <div className="product-info">
                      <div className="info-container">
                        <div className="info-container-header">
                          <div className="product-name">
                            <a href={''}>
                              <p className="product-title">Название</p>
                              <p className="product-brand">Бренд</p>
                            </a>
                          </div>
                          <div className="product-price">
                            <p className={'product-price__current'}>4 000<span className="rub-sign">Р</span></p>
                          </div>
                        </div>
                        <div className="product-hide-info">
                          <strong>Размер</strong>
                          <div className="product-size">
                            24, 44, 56
                          </div>
                          <strong>Состав</strong>
                          <div className="product-compositions">
                            какашки
                            еще какашки
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={'new-products_item'} >
                  <div className="product-item">
                    <div className="shadow" />
                    <div className={'product-item_image'} style={{ background: 'url(https://i.pinimg.com/originals/32/d8/fe/32d8fea5ce212f8c76f894c60a909487.jpg) no-repeat 50% 100%', backgroundSize: 'cover' }}></div>
                    <div className="image_overlay" />
                    <div className="add_to_cart product_opacity product-add-to-cart">
                      Добавить в карзину
                    </div>
                    <div className="add_to_compare product_opacity">Отложить</div>
                    <div className="product-info">
                      <div className="info-container">
                        <div className="info-container-header">
                          <div className="product-name">
                            <a href={''}>
                              <p className="product-title">Название</p>
                              <p className="product-brand">Бренд</p>
                            </a>
                          </div>
                          <div className="product-price">
                            <p className={'product-price__current'}>1 780<span className="rub-sign">Р</span></p>
                          </div>
                        </div>
                        <div className="product-hide-info">
                          <strong>Размер</strong>
                          <div className="product-size">
                            24, 44, 56
                          </div>
                          <strong>Состав</strong>
                          <div className="product-compositions">
                            какашки
                            еще какашки
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>

            </Grid>
          </Grid>

        </Grid>

      </Grid>
    );
  }
}
