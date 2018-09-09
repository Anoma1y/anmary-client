import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  CircularProgress,
  Grid
} from '@material-ui/core';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Home from './containers/Home';
import './style.scss';

export default class Main extends Component {

  state = {
    ready: true
  }

  renderLoader = () => <CircularProgress size={70} className={'page_loading'} />;

  renderContent = () => (
    <div className={'page'}>
      <div className={'page-main'}>
        <div className={'header-wrapper'}>
          <Header />
        </div>
        <div className={'content-wrapper'}>
          <Switch>
            <Route path={`${this.props.match.url}/`} component={Home} />
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
