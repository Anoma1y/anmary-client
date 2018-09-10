import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import {
  Grid,
  Button
} from '@material-ui/core';
import BlockInfo from './components/BlockInfo';
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
            <img src={'http://dualmonitorswallpaper.com/wp-content/uploads/2018/02/anime-scenery-background-dual-wide-9.jpg'} />
            <img src={'http://dualmonitorswallpaper.com/wp-content/uploads/2018/02/anime-scenery-background-dual-wide-9.jpg'} />
            <img src={'http://dualmonitorswallpaper.com/wp-content/uploads/2018/02/anime-scenery-background-dual-wide-9.jpg'} />
          </Carousel>
        </Grid>

        <Grid item xs={12} className={'container'}>

          <BlockInfo />

        </Grid>

        <Grid item xs={12} className={'container'}>
          <div className={'section-title-container'}>
            <div className={'section_subtitle'}>только лучшее</div>
            <div className={'section_title'}>новое поступление</div>
          </div>
        </Grid>

        <Grid item xs={12} className={'container'}>

          <Grid container className={'new-products'}>
            <Grid item xs={12} className={'new-products_list'}>

              <Grid container spacing={24}>

                <Grid item sm={6} md={4} lg={3}>
                  <div className={'product-card'}>
                    <div className={'product-card_img'}>
                      <img src={'https://qfos.ru/wp-content/uploads/2018/04/Aog6.jpg'} alt={'IMG-PRODUCT'} />

                      <a href={'#'} className={'product-card_learn-more'}>
                        Подробнее
                      </a>
                    </div>

                    <div className={'product-card-content'}>
                      <div className={'product-card-info'}>
                        <a href={'#'} className={'product-card_name'}>
                          Converse All Star Hi Plimsolls
                        </a>

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
                <Grid item sm={6} md={4} lg={3}>
                  <div className={'product-card'}>
                    <div className={'product-card_img'}>
                      <img src={'https://qfos.ru/wp-content/uploads/2018/04/Aog6.jpg'} alt={'IMG-PRODUCT'} />

                      <a href={'#'} className={'product-card_learn-more'}>
                        Подробнее
                      </a>
                    </div>

                    <div className={'product-card-content'}>
                      <div className={'product-card-info'}>
                        <a href={'#'} className={'product-card_name'}>
                          Converse All Star Hi Plimsolls
                        </a>

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
                <Grid item sm={6} md={4} lg={3}>
                  <div className={'product-card'}>
                    <div className={'product-card_img'}>
                      <img src={'https://qfos.ru/wp-content/uploads/2018/04/Aog6.jpg'} alt={'IMG-PRODUCT'} />

                      <a href={'#'} className={'product-card_learn-more'}>
                        Подробнее
                      </a>
                    </div>

                    <div className={'product-card-content'}>
                      <div className={'product-card-info'}>
                        <a href={'#'} className={'product-card_name'}>
                          Converse All Star Hi Plimsolls
                        </a>

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
                <Grid item sm={6} md={4} lg={3}>
                  <div className={'product-card'}>
                    <div className={'product-card_img'}>
                      <img src={'https://qfos.ru/wp-content/uploads/2018/04/Aog6.jpg'} alt={'IMG-PRODUCT'} />

                      <a href={'#'} className={'product-card_learn-more'}>
                        Подробнее
                      </a>
                    </div>

                    <div className={'product-card-content'}>
                      <div className={'product-card-info'}>
                        <a href={'#'} className={'product-card_name'}>
                          Converse All Star Hi Plimsolls
                        </a>

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
              </Grid>

            </Grid>
          </Grid>

        </Grid>

      </Grid>
    );
  }
}
