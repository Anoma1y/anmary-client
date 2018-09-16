import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'nuka-carousel';
import {
  Grid,
} from '@material-ui/core';
import BlockInfo from './components/BlockInfo';
import ProductList from './components/ProductList';
import {
  pullProducts,
  resetProductsList
} from './store/actions';

@connect(null, ({
  pullProducts,
  resetProductsList
}))
export default class Home extends Component {

  state = {
    readyProductList: false
  };

  componentDidMount() {
    this.props.pullProducts()
      .then(() => this.setState({ readyProductList: true }));
  }

  componentWillUnmount() {
    this.props.resetProductsList();
  }

  renderLoading = () => null;

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

          {
            this.state.readyProductList ? <ProductList /> : this.renderLoading()
          }

        </Grid>

      </Grid>
    );
  }
}
