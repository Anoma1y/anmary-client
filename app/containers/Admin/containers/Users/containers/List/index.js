import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import {
  pullUsers,
  resetUserList
} from './store/actions';
import Storage from 'lib/storage';

@connect(({ Admin_Users, Admin_Users_List }) => ({ Admin_Users, Admin_Users_List }), ({
  pullUsers,
  resetUserList,
  replace
}))
export default class List extends Component {

  state = {
    ready: false,
  };

  componentDidMount() {
    this.props.pullUsers()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetUserList();
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    const { permissions } = Storage.get('permissions');

    return (
      <Grid item xs={12} className={'users-list'}>
        {
          permissions.includes('users-create') && (
            <Grid item xs={12} md={5} lg={4}>
              <Button
                fullWidth
                variant={'raised'}
                color={'primary'}
                onClick={() => this.props.replace('/admin/users/new')}
              >
                Добавить пользователя
              </Button>
            </Grid>
          )
        }

        <Grid container>
          <Grid item xs={12} className={'admin-table'}>

            <Table className={'users-list-table'}>
              <TableHead>
                <TableRow className={'users-list-table_header'}>
                  <TableCell>ID</TableCell>
                  <TableCell>Почта</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>Телефон</TableCell>
                  <TableCell>Роль</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell style={{ width: '10%' }} />
                </TableRow>
              </TableHead>

              <TableBody className={'users-list-table_body'}>
                {
                  this.props.Admin_Users_List.users
                    .map((user) => {

                      const {
                        id,
                        name,
                        email,
                        profile,
                        roles
                      } = user;

                      return (
                        <TableRow key={id} className={'users-list-table_row'}>
                          <TableCell className={'users-list-table_item'}>{id}</TableCell>
                          <TableCell className={'users-list-table_item users-list-table_item__link'} onClick={() => this.props.replace(`/admin/users/${id}`)}>
                            {email}
                          </TableCell>
                          <TableCell className={'users-list-table_item'}>{name}</TableCell>
                          <TableCell className={'users-list-table_item'}>
                            {
                              profile.phone === '' ? 'Не указан' : profile.phone
                            }
                          </TableCell>
                          <TableCell className={'users-list-table_item'}>
                            {
                              roles.map((role) => (
                                <span key={role.name}>{role.display_name}</span>
                              ))
                            }
                          </TableCell>
                          <TableCell className={'users-list-table_item'}>{this.props.Admin_Users.schema.status[profile.status]}</TableCell>
                          <TableCell className={'users-list-table_item users-list-table_item__control'}>
                            {
                              permissions.includes('users-edit') && (
                                <Button
                                  size={'small'}
                                  variant={'outlined'}
                                  onClick={() => this.props.replace(`/admin/users/${id}/edit`)}
                                >
                                  Изменить
                                </Button>
                              )
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
              </TableBody>
            </Table>

          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
