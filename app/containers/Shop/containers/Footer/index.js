import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Storage from 'lib/storage';
import './style.scss';

export default class Footer extends Component {
  render() {
    const isAdmin = Storage.get('is_superuser');

    return (
      <footer className={'footer'}>
        <div className={'footer_logo'}>
          <a href={'#'}>Anmary</a>
        </div>
        <nav className={'footer_nav'}>
          <ul>
            <li><Link to={'/'}>Главная</Link></li>
            <li><Link to={'/product'}>Каталог</Link></li>
            <li><Link to={'/news'}>Новости</Link></li>
            <li><Link to={'/contact'}>Контакты</Link></li>
            {isAdmin && <li><Link to={'/admin'}>Админ</Link></li>}
          </ul>
        </nav>
        <div className={'footer_pay'}>
          <ul>
            <li>
              <img src={'/static/icons/mastercard.svg'} alt={'Master Card'} />
            </li>
            <li>
              <img src={'/static/icons/visa.svg'} alt={'Visa'} />
            </li>
            <li>
              <img src={'/static/icons/mir.svg'} alt={'MIR'} />
            </li>
            <li>
              <img src={'/static/icons/apple-pay.svg'} alt={'Apple Pay'} />
            </li>
            <li>
              <img src={'/static/icons/wifi.png'} alt={'PayPass'} />
            </li>
          </ul>
        </div>
        <div className={'footer_copyright'}>
          Copyright &copy; 2013 - {moment().format('YYYY')} All rights reserved
        </div>
      </footer>
    );
  }

}
