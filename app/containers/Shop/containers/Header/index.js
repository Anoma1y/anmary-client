import React, { Component } from 'react';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import './style.scss';

export default class Header extends Component {

  state = {
    headerScrolled: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateDimensions);
  }

  updateDimensions = () => {
    if (window.pageYOffset > 100) {
      if (this.state.headerScrolled) return;
      this.setState({ headerScrolled: true });
    } else {
      if (!this.state.headerScrolled) return;
      this.setState({ headerScrolled: false });
    }
  };

  render() {
    return (
      <header className={`header${this.state.headerScrolled ? ' scrolled' : ''}`}>
        <div className={'header_inner'}>
          <div className={'header_logo'}>
            <a href={'#'}>Anmary</a>
          </div>
          <nav className={'main_nav'}>
            <ul>
              <li><a href={'#'}>home</a></li>
              <li><a href={'#'}>clothes</a></li>
              <li><a href={'#'}>accessories</a></li>
              <li><a href={'#'}>lingerie</a></li>
              <li><a href={'#'}>contact</a></li>
            </ul>
          </nav>
          <div className={'header-content'}>
            <div className={'header-search'}>
              <form action={'#'}>
                <input type={'text'} className={'header-search_input'} required={'required'} />
                <div className={'header-search_icon'}>
                  <SearchIcon />
                </div>
                <button type={'submit'} className={'header-search_btn'} />
              </form>
            </div>
            <div className={'header-shopping'}>
              <div className={'header-shopping_item'}>
                <span className={'header-shopping_count'}>2</span>
                <div className={'header-shopping_icon'}>
                  <ShoppingCartIcon />
                </div>
              </div>
              <div className={'header-shopping_item'}>
                <span className={'header-shopping_count'}>13</span>
                <div className={'header-shopping_icon'}>
                  <FavoriteIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
