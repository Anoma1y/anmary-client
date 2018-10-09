import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
  Menu as MobileMenuIcon,
  Close as MobileMenuClose,
} from '@material-ui/icons';
import {
  Drawer,
  IconButton,
  Badge,
} from '@material-ui/core';
import {
  changeSearchValue,
  applySearch
} from 'containers/Shop/store/actions';
import './style.scss';

@connect(({ routing, Shop }) => ({ routing, Shop }), ({
  replace,
  changeSearchValue,
  applySearch
}))
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

  handleChangeSearchValue = (event) => this.props.changeSearchValue(event.target.value);

  handleApplySearch = () => {
    const { search } = this.props.Shop;

    if (search.length > 0 && search.length <= 100) {
      this.props.applySearch();
    }
  };

  render() {
    const { pathname } = this.props.routing.location;

    return (
      <header className={`header${this.state.headerScrolled ? ' scrolled' : ''}`}>
        <div className={'header_inner'}>
          <div className={'header_logo'}>
            <Link to={'/'}>
              <img src={'/static/images/logo.svg'} alt={'Logo'} />
            </Link>
          </div>
          <nav className={'main-nav'}>
            <ul className={'main-nav-list'}>
              <li className={'main-nav-list_item'}>
                <Link
                  to={'/'}
                  className={`main-nav_link${pathname === '/' ? ' main-nav_link__active' : ''}`}
                >
                  Главная
                </Link>
              </li>
              <li className={'main-nav-list_item'}>
                <Link
                  to={'/product'}
                  className={`main-nav_link${pathname === '/product' ? ' main-nav_link__active' : ''}`}
                >
                  Каталог
                </Link>
              </li>
              <li className={'main-nav-list_item'}>
                <Link
                  to={'/news'}
                  className={`main-nav_link${pathname === '/news' ? ' main-nav_link__active' : ''}`}
                >
                  Новости
                </Link>
              </li>
              <li className={'main-nav-list_item'}>
                <Link
                  to={'/contact'}
                  className={`main-nav_link${pathname === '/contact' ? ' main-nav_link__active' : ''}`}
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </nav>
          <div className={'header-content'}>
            <div className={'header-search'}>
              <form
                action={'#'}
                onSubmit={(e) => {
                  e.preventDefault();
                  this.handleApplySearch();
                }}
              >
                <input
                  type={'text'}
                  className={'header-search_input'}
                  required={'required'}
                  value={this.props.Shop.search}
                  onChange={this.handleChangeSearchValue}
                />
                <div className={'header-search_icon'}>
                  <SearchIcon />
                </div>
                <button
                  type={'submit'}
                  className={'header-search_btn'}
                />
              </form>
            </div>
            <div className={'header-shopping'}>
              <div className={'header-shopping_item'}>

                <IconButton
                  onClick={() => this.props.replace('/cart')}
                >
                  <Badge badgeContent={0} color={'primary'}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

              </div>
              <div className={'header-shopping_item'}>

                <IconButton
                  onClick={() => this.props.replace('/favorite')}
                >
                  <Badge badgeContent={0} color={'primary'}>
                    <FavoriteIcon />
                  </Badge>
                </IconButton>

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
                    <form
                      action={'#'}
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.handleApplySearch();
                      }}
                    >
                      <input
                        type={'text'}
                        className={'header-search_input mobile-main-nav-search_input'}
                        required={'required'}
                        value={this.props.Shop.search}
                        onChange={this.handleChangeSearchValue}
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
                    <ul className={'mobile-main-nav-list'}>
                      <li className={'mobile-main-nav-list_item'}>
                        <Link
                          to={'/'}
                          className={`mobile-main-nav_link${pathname === '/' ? ' mobile-main-nav_link__active' : ''}`}
                        >
                          Главная
                        </Link>
                      </li>
                      <li className={'mobile-main-nav-list_item'}>
                        <Link
                          to={'/product'}
                          className={`mobile-main-nav_link${pathname === '/product' ? ' mobile-main-nav_link__active' : ''}`}
                        >
                          Каталог
                        </Link>
                      </li>
                      <li className={'mobile-main-nav-list_item'}>
                        <Link
                          to={'/news'}
                          className={`mobile-main-nav_link${pathname === '/news' ? ' mobile-main-nav_link__active' : ''}`}
                        >
                          Новости
                        </Link>
                      </li>
                      <li className={'mobile-main-nav-list_item'}>
                        <Link
                          to={'/contact'}
                          className={`mobile-main-nav_link${pathname === '/contact' ? ' mobile-main-nav_link__active' : ''}`}
                        >
                          Контакты
                        </Link>
                      </li>
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
