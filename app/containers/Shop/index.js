import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Products from './containers/Products';
import News from './containers/News';
import Favorite from './containers/Favorite';
import Cart from './containers/Cart';
import Home from './containers/Home';
import Contact from './containers/Contact';
import NotFound from 'containers/NotFound';
import './style.scss';

export default class Shop extends Component {

  state = {
    ready: true
  };

  renderLoader = () => <CircularProgress size={70} className={'page_loading'} />;

  renderContent = () => (
    <div className={'page'}>
      <div className={'page-main'}>

        <div className={'header-wrapper'}>
          <Header />
        </div>

        <div className={'content-wrapper shop'}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/product'} component={Products} />
            <Route path={'/news'} component={News} />
            <Route path={'/cart'} component={Cart} />
            <Route path={'/favorite'} component={Favorite} />
            <Route path={'/contact'} component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </div>

        <div className={'footer-wrapper'}>
          <Footer />
        </div>

      </div>
    </div>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
