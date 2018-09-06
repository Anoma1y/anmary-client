import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Sidebar from './containers/Sidebar';
import Roles from './containers/Roles';
import Users from './containers/Users';
import Header from './containers/Header';
import Categories from './containers/Categories';
import Seasons from './containers/Seasons';
import Brands from './containers/Brands';
import './style.scss';

export default class Admin extends Component {

  state = {
    ready: true // todo: fix
  };

  renderLoader = () => <CircularProgress size={70} className={'page_loading'} />;

  renderContent = () => (
    <div className={'page'}>

      <div className={'page-sidebar'}>
        <Sidebar />
      </div>

      <div className={'page-main'}>

        <div className={'header-wrapper'}>
          <Header />
        </div>

        <div className={'content-wrapper'}>
          <Switch>
            <Route path={`${this.props.match.url}/categories`} component={Categories} />
            <Route path={`${this.props.match.url}/roles`} component={Roles} />
            <Route path={`${this.props.match.url}/users`} component={Users} />
            <Route path={`${this.props.match.url}/seasons`} component={Seasons} />
            <Route path={`${this.props.match.url}/brands`} component={Brands} />
          </Switch>
        </div>
      </div>

    </div>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }

}
