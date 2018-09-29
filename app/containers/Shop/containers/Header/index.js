import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
  Menu as MobileMenuIcon,
  Close as MobileMenuClose,
} from '@material-ui/icons';
import {
  Grid,
  Drawer
} from '@material-ui/core';
import './style.scss';

export default class Header extends Component {

  state = {
    headerScrolled: false,
    mobileMenuIsOpen: false
  };

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
            <Link to={'/'}>
              <img src={'/static/images/logo.svg'} alt={'Logo'} />
            </Link>
          </div>
          <nav className={'main-nav'}>
            <ul>
              <li><Link to={'/'}>Главная</Link></li>
              <li><Link to={'/product'}>Каталог</Link></li>
              <li><Link to={'/news'}>Новости</Link></li>
              <li><Link to={'/contact'}>Контакты</Link></li>
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
                {/*<span className={'header-shopping_count'}>2</span>*/}
                <div className={'header-shopping_icon'}>
                  <ShoppingCartIcon />
                </div>
              </div>
              <div className={'header-shopping_item'}>
                {/*<span className={'header-shopping_count'}>13</span>*/}
                <div className={'header-shopping_icon'}>
                  <FavoriteIcon />
                </div>
              </div>
            </div>
            <div className={'mobile-main-nav'}>
              <button
                className={'mobile-main-nav_trigger'}
                onClick={() => this.setState({ mobileMenuIsOpen: true })}
              >
                <MobileMenuIcon />
              </button>
              <Drawer
                anchor={'right'}
                open={this.state.mobileMenuIsOpen}
                onClose={() => this.setState({ mobileMenuIsOpen: false })}
                className={'mobile-main-nav_drawer'}
              >
                <div className={'mobile-main-nav_wrapper'}>
                  <div className={'mobile-main-nav_inner mobile-main-nav_close'}>
                    <button
                      className={'mobile-main-nav_trigger mobile-main-nav_trigger__right'}
                      onClick={() => this.setState({ mobileMenuIsOpen: false })}
                    >
                      <MobileMenuClose />
                    </button>
                  </div>
                  <div className={'mobile-main-nav_inner mobile-main-nav_logo'}>
                    <Link to={'/'}>
                      <img
                        src={'/static/images/logo.svg'}
                        alt={'Mobile Logo'}
                      />
                    </Link>
                  </div>
                  <div className={'mobile-main-nav_inner mobile-main-nav_search'}>
                    <form action={'#'}>
                      <input
                        type={'text'}
                        className={'header-search_input mobile-main-nav-search_input'}
                        required={'required'}
                      />
                      <div className={'header-search_icon mobile-main-nav-search_icon'}>
                        <SearchIcon />
                      </div>
                      <button
                        type={'submit'}
                        className={'header-search_btn mobile-main-nav-search_btn'}
                      />
                    </form>
                  </div>
                  <nav className={'mobile-main-nav_inner mobile-main-nav_nav'}>
                    <ul>
                      <li><Link to={'/'}>Главная</Link></li>
                      <li><Link to={'/product'}>Каталог</Link></li>
                      <li><Link to={'/news'}>Новости</Link></li>
                      <li><Link to={'/contact'}>Контакты</Link></li>
                    </ul>
                  </nav>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
