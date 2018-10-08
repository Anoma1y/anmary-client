import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.scss';

@connect(({ routing }) => ({ routing }))
export default class Footer extends Component {
  render() {
    const { pathname } = this.props.routing.location;

    return (
      <footer className={'footer'}>
        <div className={'footer-logo'}>
          <a
            href={'#'}
            className={'footer-logo_link'}
          >
            Anmary
          </a>
        </div>
        <nav className={'footer-nav'}>
          <ul className={'footer-nav-list'}>
            <li className={'footer-nav-list_item'}>
              <Link
                to={'/'}
                className={`footer-nav_link${pathname === '/' ? ' footer-nav_link__active' : ''}`}
              >
                Главная
              </Link>
            </li>
            <li className={'footer-nav-list_item'}>
              <Link
                to={'/product'}
                className={`footer-nav_link${pathname === '/product' ? ' footer-nav_link__active' : ''}`}
              >
                Каталог
              </Link>
            </li>
            <li className={'footer-nav-list_item'}>
              <Link
                to={'/news'}
                className={`footer-nav_link${pathname === '/news' ? ' footer-nav_link__active' : ''}`}
              >
                Новости
              </Link>
            </li>
            <li className={'footer-nav-list_item'}>
              <Link
                to={'/contact'}
                className={`footer-nav_link${pathname === '/contact' ? ' footer-nav_link__active' : ''}`}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>
        <div className={'footer-pay'}>
          <ul className={'footer-pay-list'}>
            <li className={'footer-pay-list_item'}>
              <img
                src={'/static/icons/mastercard.svg'}
                alt={'Master Card'}
                className={'footer-pay_img'}
              />
            </li>
            <li className={'footer-pay-list_item'}>
              <img
                src={'/static/icons/visa.svg'}
                alt={'Visa'}
                className={'footer-pay_img'}
              />
            </li>
            <li className={'footer-pay-list_item'}>
              <img
                src={'/static/icons/mir.svg'}
                alt={'MIR'}
                className={'footer-pay_img'}
              />
            </li>
            <li className={'footer-pay-list_item'}>
              <img
                src={'/static/icons/apple-pay.svg'}
                alt={'Apple Pay'}
                className={'footer-pay_img'}
              />
            </li>
            <li className={'footer-pay-list_item'}>
              <img
                src={'/static/icons/wifi.png'}
                alt={'PayPass'}
                className={'footer-pay_img'}
              />
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
