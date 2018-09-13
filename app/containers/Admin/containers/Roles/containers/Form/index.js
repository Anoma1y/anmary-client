import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Divider,
  Typography,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import MuiButton from 'components/MuiButton';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import {
  changePermission,
  addRole,
  editRole,
  changeRole,
  pullRole,
  resetRoleForm
} from './store/actions';

@connect(({ Admin_Roles, Admin_Roles_Form }) => ({ Admin_Roles, Admin_Roles_Form }), ({
  changePermission,
  changeRole,
  addRole,
  editRole,
  pullRole,
  resetRoleForm
}))
export default class Form extends Component {

  state = {
    ready: false,
    nameIsErrorValidation: false,
    pageType: 'add'
  };

  componentDidMount() {
    if ('id' in this.props.match.params) {
      const { id } = this.props.match.params;
      this.props.pullRole(id)
        .then(() => this.setState({ ready: true, pageType: 'edit' }));
    } else {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.props.resetRoleForm();
  }

  handleChangeRoleName = (e) => {
    const { value } = e.target;

    this.setState({
      nameIsErrorValidation: value.length < 3
    });

    this.props.changeRole('display_name', value);
  };

  handleChangeRoleDescription = (e) => this.props.changeRole('description', e.target.value);

  handleChangePermission = (permissionKey) => {
    const { permissions } = this.props.Admin_Roles_Form.role;

    if (permissions.includes(permissionKey)) {
      this.props.changePermission(permissionKey, false);
    } else {
      this.props.changePermission(permissionKey, true);
    }
  };

  handleClick = () => {
    const { pageType } = this.state;

    if (pageType === 'edit') {
      this.props.editRole();
    } else {
      this.props.addRole();
    }
  };

  renderPermissions = () => {
    return Object.keys(this.props.Admin_Roles.schema)
      .map((permission) => (
        <Fragment key={permission}>
          <Grid item xs={12} className={'admin-form_row'} >
            <FormControl fullWidth className={'admin-form_control'}>

              <FormLabel component={'legend'} className={'admin-form_label'}>
                {
                  this.props.Admin_Roles.schema[permission].description
                }
              </FormLabel>

              <Grid container justify={'center'}>
                <Grid item xs={12} className={'admin-form'} >
                  <Grid container spacing={40} className={'roles-form-permissions'}>
                    {
                      Object.keys(this.props.Admin_Roles.schema[permission].actions)
                        .map((action) => {
                          const permissionKey = `${permission}-${action}`;

                          return (
                            <Grid key={permissionKey} item xs={12} className={'roles-form-permissions_item'}>
                              <FormControlLabel
                                label={this.props.Admin_Roles.schema[permission].actions[action]}
                                control={
                                  <Switch
                                    color={'primary'}
                                    checked={this.props.Admin_Roles_Form.role.permissions.includes(permissionKey)}
                                    onChange={() => this.handleChangePermission(permissionKey)}
                                    value={permissionKey}
                                  />
                                }
                              />
                            </Grid>
                          );
                        })
                    }
                  </Grid>
                </Grid>
              </Grid>

            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Fragment>
      ));
  };

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    return (
      <Grid item xs={12} md={8} className={'admin-form'}>

        <Grid container className={'roles-list_header'}>
          <Grid item xs={12}>
            <Typography variant={'headline'}>
              {this.state.pageType === 'add' ? 'Добавление роли' : 'Редактирование роли'}
            </Typography>
          </Grid>
        </Grid>

        <FormControl fullWidth className={'admin-form_control'}>
          <Grid container justify={'flex-start'}>

            <Grid item xs={12} className={'admin-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={6} className={'admin-form_item'}>
                  <TextField
                    fullWidth
                    label={'Имя роли'}
                    onChange={this.handleChangeRoleName}
                    value={this.props.Admin_Roles_Form.role.display_name}
                    helperText={this.state.nameIsErrorValidation ? 'Имя роли должно содержать минимум 3 символа' : 'Обязательное поле'}
                    error={this.state.nameIsErrorValidation}
                  />
                </Grid>
                <Grid item xs={6} className={'admin-form_item'}>
                  <TextField
                    fullWidth
                    label={'Ключ роли'}
                    disabled
                    helperText={'Генерируется автоматически'}
                    placeholder={'Name'}
                    value={
                      this.state.pageType === 'add' ? (
                        cyrillicToTranslit().transform(this.props.Admin_Roles_Form.role.display_name.toLowerCase(), '_')
                      ) : this.props.Admin_Roles_Form.role.name
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'admin-form_row'} >
              <Grid container spacing={40} >
                <Grid item xs={12} className={'admin-form_item'}>
                  <TextField
                    fullWidth
                    label={'Описание'}
                    onChange={this.handleChangeRoleDescription}
                    value={this.props.Admin_Roles_Form.role.description}
                    helperText={'Необязательное поле'}
                  />
                </Grid>
              </Grid>
            </Grid>

            {
              this.renderPermissions()
            }

            <Grid item xs={12} sm={6} md={3} className={'admin-form_row'}>
              <MuiButton isLoading={this.props.Admin_Roles_Form.isLoading}>
                <Button
                  fullWidth
                  variant={'raised'}
                  color={'primary'}
                  className={'admin-form_btn'}
                  disabled={this.props.Admin_Roles_Form.isLoading}
                  onClick={this.handleClick}
                >
                  {
                    this.state.pageType === 'add' ? (
                      <Fragment>
                        <AddIcon className={'btn-icon btn-icon__left'} />
                        Добавить
                      </Fragment>
                    ) : (
                      <Fragment>
                        <EditIcon className={'btn-icon btn-icon__left'} />
                        Изменить
                      </Fragment>
                    )
                  }
                </Button>
              </MuiButton>
            </Grid>

          </Grid>
        </FormControl>
      </Grid>
    );
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
