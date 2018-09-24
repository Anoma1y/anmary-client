import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  CircularProgress,
  Grid
} from '@material-ui/core';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Products from './containers/Products';
import News from './containers/News';
import Home from './containers/Home';
import Contact from './containers/Contact';
import Admin from 'containers/Admin';
import Auth from 'containers/Auth';
import NotFound from 'containers/NotFound';
import './style.scss';

// todo добавить кэш для пула (категорий, размеров и т.п.) в списке продуктов или сделать пул тут
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

        <div className={'content-wrapper'}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/product'} component={Products} />
            <Route path={'/news'} component={News} />
            <Route path={'/contact'} component={Contact} />
            <Route path={'/admin'} component={Admin} />
            <Route path={'/auth'} component={Auth} />
            <Route component={NotFound} />
          </Switch>
        </div>

        <div className={'footer-wrapper'}>
          <Footer />
        </div>

      </div>
    </div>
  )

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
