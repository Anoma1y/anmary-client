import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  SupervisorAccount as SupervisorAccountIcon,
  CardMembership as CardMembershipIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  Inbox as InboxIcon,
  ImportExport as ImportExportIcon
} from '@material-ui/icons';
import Storage from 'lib/storage';

const NAVIGATION_MENU = [
  { id: 1, role_name: 'operations-list', name: 'Товары', icon: <AccountBalanceIcon />, link: '/admin/products' },
  { id: 2, role_name: 'shift-list', name: 'Пользователи', icon: <CardMembershipIcon />, link: '/admin/users' },
  { id: 3, role_name: 'roles-list', name: 'Роли', icon: <AssessmentIcon />, link: '/admin/roles' },
  { id: 4, role_name: 'users-list', name: 'Категории', icon: <SupervisorAccountIcon />, link: '/admin/categories' },
  { id: 5, role_name: 'categories-list', name: 'Бренды', icon: <InboxIcon />, link: '/admin/brands' },
  { id: 6, role_name: 'export-list', name: 'Сезоны', icon: <ImportExportIcon />, link: '/admin/seasons' }
];

export default class Navigation extends Component {

  renderItem = (item) => (
    <div className={'sidebar-item sidebar-navigation_item'} key={item.id}>
      <div className={'sidebar-item_icon'}>
        <div className={'sidebar-navigation_avatar'}>
          {item.icon}
        </div>
      </div>

      <div className={'sidebar-item_content'}>
        <Link className={'sidebar-navigation_link'} to={item.link}>{item.name}</Link>
      </div>
    </div>
  );

  render() {
    const { permissions } = Storage.get('permissions');

    return (
      <div className={'sidebar-navigation'}>
        {
          NAVIGATION_MENU.map((item) => permissions.includes(item.role_name) ? this.renderItem(item) : null)
        }
      </div>
    );
  }
}
