import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
  Divider,
  CircularProgress,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Add as AddIcon
} from '@material-ui/icons';
import {
  pullRoles,
  resetRoleList
} from './store/actions';
import Storage from 'lib/storage';

@connect(({ Admin_Roles_List }) => ({ Admin_Roles_List }), ({
  pullRoles,
  resetRoleList,
  replace
}))
export default class List extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    this.props.pullRoles()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetRoleList();
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    const { permissions } = Storage.get('permissions');

    return (
      <Grid item xs={12} className={'roles-list'}>
        <Grid container className={'roles-list_header'}>
          <Grid item xs={12}>
            <Typography variant={'headline'}>
              Список ролей пользователей
            </Typography>
          </Grid>
        </Grid>
        {
          permissions.includes('roles-create') && (
            <Grid container className={'roles-list_control'}>
              <Grid item xs={12} md={6} lg={3}>
                <Button
                  fullWidth
                  color={'primary'}
                  variant={'raised'}
                  onClick={() => this.props.replace('/admin/roles/new')}
                >
                  <AddIcon className={'btn-icon btn-icon__left'} />
                  Добавить роль
                </Button>
              </Grid>
              <Grid item xs={12} className={'roles-list_divider'}>
                <Divider />
              </Grid>
            </Grid>
          )
        }
        <Grid container>
          {
            this.props.Admin_Roles_List.roles
              .map((role) => (
                <Grid key={role.id} item xs={12} className={'roles-list_item'}>
                  <Card className={'card'}>
                    <CardHeader
                      title={role.display_name}
                    />
                    <CardContent>
                      <Typography>{role.description}</Typography>
                    </CardContent>
                    {
                      permissions.includes('roles-edit') && (
                        <CardActions className={'card-actions'}>
                          <Button
                            variant={'raised'}
                            size={'small'}
                            onClick={() => this.props.replace(`/admin/roles/${role.id}/edit`)}
                          >
                            <EditIcon className={'btn-icon btn-icon__left'} />
                            Изменить
                          </Button>
                        </CardActions>
                      )
                    }
                  </Card>
                </Grid>
              ))
          }
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
