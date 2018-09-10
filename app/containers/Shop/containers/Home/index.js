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
            <img src={'/static/images/home_slider_1.jpg'} />
            <img src={'/static/images/home_slider_1.jpg'} />
            <img src={'/static/images/home_slider_1.jpg'} />
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
                  <div className="product">
                    <div className="product-img">
                      <img src="http://www.vaide.lv/files/vaideCollectionGallery/00-8752_800x1200.jpg" alt="IMG-PRODUCT" />

                      <a href="#" className={'product-quick-view'}>
                        Quick View
                      </a>
                    </div>

                    <div className="product-content">
                      <div className="product-info">
                        <a href="#" className="product-name">
                          Converse All Star Hi Plimsolls
                        </a>

                        <span className="product-price">
                            $75.00
                        </span>
                      </div>

                      <div className="product-favorite">
                        <FavoriteIcon />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={6} md={4} lg={3}>
                  <div className="product">
                    <div className="product-img">
                      <img src="http://www.vaide.lv/files/vaideCollectionGallery/00-8752_800x1200.jpg" alt="IMG-PRODUCT" />

                      <a href="#" className={'product-quick-view'}>
                        Quick View
                      </a>
                    </div>

                    <div className="product-content">
                      <div className="product-info">
                        <a href="#" className="product-name">
                          Converse All Star Hi Plimsolls
                        </a>

                        <span className="product-price">
                            $75.00
                        </span>
                      </div>

                      <div className="product-favorite">
                        <FavoriteIcon />
                      </div>
                    </div>
                  </div>
                </Grid>                <Grid item sm={6} md={4} lg={3}>
                  <div className="product">
                    <div className="product-img">
                      <img src="https://i.pinimg.com/736x/af/1c/30/af1c30d6d881d9447dec06149f61d2f9--drawings-of-girls-anime-drawings-girl.jpg" alt="IMG-PRODUCT" />

                      <a href="#" className={'product-quick-view'}>
                      Quick View
                      </a>
                    </div>

                    <div className="product-content">
                      <div className="product-info">
                        <a href="#" className="product-name">
                        Converse All Star Hi Plimsolls
                        </a>

                        <span className="product-price">
                            $75.00
                        </span>
                      </div>

                      <div className="product-favorite">
                        <FavoriteIcon />
                      </div>
                    </div>
                  </div>
                </Grid>                <Grid item sm={6} md={4} lg={3}>
                                         <div className="product">
                    <div className="product-img">
                                             <img src="https://pm1.narvii.com/6448/76156a7706585cb6b463531e9aa42cdc7f6180fe_hq.jpg" alt="IMG-PRODUCT" />

                                             <a href="#" className={'product-quick-view'}>
                      Quick View
                      </a>
                                           </div>

                    <div className="product-content">
                                             <div className="product-info">
                        <a href="#" className="product-name">
                        Converse All Star Hi Plimsolls
                                               </a>

                        <span className="product-price">
                            $75.00
                                               </span>
                      </div>

                                             <div className="product-favorite">
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
