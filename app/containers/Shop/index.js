import React, { Component } from 'react';
import {
  Grid
} from '@material-ui/core';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Carousel from 'nuka-carousel';

export default class Main extends Component {
  render() {
    return (
      <Grid container style={{ height: 3500 }}>
        <Header />
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
        <Grid item xs={12} className={'shop-container shop-footer'}>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}
