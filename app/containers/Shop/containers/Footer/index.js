import React, { Component } from 'react';
import moment from 'moment';
import './style.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className={'footer'}>
        <div className={'footer_logo'}>
          <a href={'#'}>Anmary</a>
        </div>
        <nav className={'footer_nav'}>
          <ul>
            <li><a href={'#'}>home</a></li>
            <li><a href={'#'}>clothes</a></li>
            <li><a href={'#'}>accessories</a></li>
            <li><a href={'#'}>lingerie</a></li>
            <li><a href={'#'}>contact</a></li>
          </ul>
        </nav>
        <div className={'footer_pay'}>
          <ul>
            <li>
              <img src={'/static/icons/mastercard.svg'} alt={''} />
            </li>
            <li>
              <img src={'/static/icons/visa.svg'} alt={''} />
            </li>
            <li>
              <img src={'/static/icons/mir.svg'} alt={''} />
            </li>
            <li>
              <img src={'/static/icons/apple-pay.svg'} alt={''} />
            </li>
            <li>
              <img src={'/static/icons/wifi.png'} alt={''} />
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
