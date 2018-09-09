import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { replace } from 'react-router-redux';
import Sidebar from './containers/Sidebar';
import Roles from './containers/Roles';
import Users from './containers/Users';
import Header from './containers/Header';
import Categories from './containers/Categories';
import Seasons from './containers/Seasons';
import Brands from './containers/Brands';
import Compositions from './containers/Compositions';
import Products from './containers/Products';
import { send } from 'containers/Notification/store/actions';
import {
  pullUser,
} from './store/actions';
import uuid from 'uuid/v1';
import moment from 'moment';
import Storage from 'lib/storage';
import { api } from 'lib/api';
import './style.scss';

@connect(null, ({
  send,
  replace,
  pullUser,
}))
export default class Admin extends Component {

  state = {
    ready: false // todo: fix
  };

  componentDidMount() {
    const authToken = Storage.get('members');

    if (authToken === null) {
      Storage.clear();
      api.removeHeader('Authorization');
      this.props.replace('/auth/signin');
      return;
    }

    const { token, expiration_time } = authToken;

    if (authToken && (moment() < moment(expiration_time * 1000))) {
      this.handlerInit(token);
    } else {
      this.handlerError('warning', 'Предупреждение', 'Время сессии истекло');
    }
  }

  handlerInit = (token) => {
    const tokenName = `Bearer ${token}`;

    api.addHeader('Authorization', tokenName)
      .then(() => {
        Promise.all([
          this.props.pullUser()
        ])
          .then(() => this.setState({ ready: true }))
          .catch(() => this.handlerError('error', 'Ошибка', 'Данные не были загружены'));
      })
      .catch(() => this.handlerError('error', 'Ошибка', 'Данные не были загружены'));
  };

  /**
   * Метод для вывода оповещения и ошибки
   * @param status - статус оповещения
   * @param title - заголовок оповещения
   * @param message - сообщение оповещения
   */
  handlerError = (status, title, message) => {
    this.props.send({ id: uuid(), status, title, message, actionClose: true });
    Storage.clear();
    api.removeHeader('Authorization');
    this.props.replace('/auth/signin');
  };

  renderLoader = () => <CircularProgress size={70} className={'admin-page_loading'} />;

  renderContent = () => (
    <div className={'admin-page'}>

      <div className={'admin-page-sidebar'}>
        <Sidebar />
      </div>

      <div className={'admin-page-main'}>

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
            <Route path={`${this.props.match.url}/products`} component={Products} />
            <Route path={`${this.props.match.url}/compositions`} component={Compositions} />
          </Switch>
        </div>
      </div>

    </div>
  );

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }

}
