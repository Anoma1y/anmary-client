import React, { Component } from 'react';
import UserInfo from './components/UserInfo';
import Navigation from './components/Navigation';
import { Person as PersonIcon } from '@material-ui/icons';
import './style.scss';

export default class Sidebar extends Component {

  state = {
    sidebarIsOpen: false
  };

  /**+
   * После монтирования и демонтирования компонента, добавляются / убираются обработчики событий для
   * - ресайза области с целью изменения состояния sidebarIsOpen на false - закрытие сайдбара
   * - клик по любой другой области не совпадающей с сайдбаром
   * Первичная инициализация подразумевает для каждой роли получения нобходиммых данных
   * Для карты получается инфа о всех картах привязанных  к аккаунту и затем выполнения Promise.all для каждого id карты
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Метод обработчки клика по области (не сайдбара)
   * Переводит стейт в состояние false
   * @param event
   */
  handleClickOutside = (event) => {
    if (this.sidebarRef && !this.sidebarRef.contains(event.target)) {
      this.setState({ sidebarIsOpen: false });
    }
  };

  /**
   * Метод обработчки ресайза, если рабочая область больше 1200 пикселей (3ий основной брейкпоинт)
   * то переводит стейт в состояние false
   */
  updateDimensions = () => {
    if (window.innerWidth >= 1200) {
      this.setState({ sidebarIsOpen: false });
    }
  };

  /**
   * Метод обработчки клика по батону вызова сайдбара
   */
  handleSidebarOpen = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  };

  /**
   * Привязка ref для дива с контейнером сайдбара
   * @param node
   */
  handleSidebarRef = (node) => {
    this.sidebarRef = node;
  };

  render() {
    const { sidebarIsOpen } = this.state;

    return (
      <React.Fragment>
        <div className={`sidebar sidebar-content ${sidebarIsOpen ? 'sidebar__active' : ''}`} ref={this.handleSidebarRef}>
          <div className={'sidebar-wrapper'}>

            <div className={'sidebar-inner'}>
              <UserInfo />
            </div>

            <div className={'sidebar-inner'}>
              <Navigation />
            </div>

          </div>
        </div>
        <div className={'sidebar-mobile'}>
          <button className={'sidebar-mobile_button'} onClick={this.handleSidebarOpen}>

            <PersonIcon color={'primary'} />

          </button>
        </div>
        <div className={`blackout ${sidebarIsOpen ? 'blackout__active' : ''}`} />
      </React.Fragment>
    );
  }
}

