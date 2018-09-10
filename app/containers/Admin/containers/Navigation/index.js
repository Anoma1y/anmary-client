import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  CardMembership as CardMembershipIcon,
  ImportExport as ImportExportIcon,
  Inbox as InboxIcon,
  SupervisorAccount as SupervisorAccountIcon
} from '@material-ui/icons';
import Storage from 'lib/storage';

const NAVIGATION_MENU = [
  { id: 1, role_name: 'products-list', name: 'Товары', icon: <AccountBalanceIcon />, link: '/admin/products' },
  { id: 2, role_name: 'users-list', name: 'Пользователи', icon: <CardMembershipIcon />, link: '/admin/users' },
  { id: 3, role_name: 'roles-list', name: 'Роли', icon: <AssessmentIcon />, link: '/admin/roles' },
  { id: 4, role_name: 'categories-list', name: 'Категории', icon: <SupervisorAccountIcon />, link: '/admin/categories' },
  { id: 5, role_name: 'brands-list', name: 'Бренды', icon: <InboxIcon />, link: '/admin/brands' },
  { id: 6, role_name: 'seasons-list', name: 'Сезоны', icon: <ImportExportIcon />, link: '/admin/seasons' },
  { id: 7, role_name: 'compositions-list', name: 'Составы', icon: <InboxIcon />, link: '/admin/compositions' }
];
const { permissions } = Storage.get('permissions');

export default class Navigation extends Component {
  renderItem = (item) => (
    <Link key={item.id} className={'admin-navigation_item'} to={item.link}>
      <div className={'admin-navigation_icon'}>
        {item.icon}
      </div>
      <div className={'admin-navigation_name'}>
        {item.name}
      </div>
    </Link>
  );

  render() {
    return (
      <div className={'admin-bottom-navigation'}>
        <div className={'admin-bottom-navigation_wrapper'}>
          {
            NAVIGATION_MENU.map((item) => permissions.includes(item.role_name) ? this.renderItem(item) : null)
          }
        </div>
      </div>
    );
  }
}
