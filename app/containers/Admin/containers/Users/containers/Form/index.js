import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
} from 'redux-form';
import {
  Grid,
  Button,
  InputLabel,
  MenuItem,
  CircularProgress,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import FieldText from 'containers/Admin/components/FieldText';
import FieldSelectNew from 'containers/Admin/components/FieldSelectNew';
import MuiButton from 'components/MuiButton';
import {
  addUser,
  editUser,
  pullUser,
  pullRoles,
  resetUserForm
} from './store/actions';
import './style.scss';

let isPasswordValidate = true;

const validate = values => {
  const errors = {

  };

  if (!values.name) {
    errors.name = 'Обязательное поле';
  } else if (values.name.length < 5) {
    errors.name = 'Имя должно содержать минимум 5 символов';
  }

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неверный адрес электронной почты';
  }
  if (isPasswordValidate) {
    if (!values.password) {
      errors.password = 'Обязательное поле';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль должен быть больше 6 символов';
    }
  }

  return errors;
};

@connect(({ Admin_Users, Admin_Users_Form }) => ({ Admin_Users, Admin_Users_Form, initialValues: window.location.pathname.split('/').some((it) => it === 'new') ? null : Admin_Users_Form.user }), ({
  pullUser,
  addUser,
  editUser,
  pullRoles,
  resetUserForm,
}))
@reduxForm({ form: 'Admin_Users_Form', validate, enableReinitialize: true })
export default class Form extends Component {

  state = {
    ready: false,
    pageType: 'add'
  };

  componentDidMount() {
    Promise.all([this.props.pullRoles()])
      .then(() => {
        if ('id' in this.props.match.params) {
          const { id } = this.props.match.params;

          this.props.pullUser(id)
            .then(() => this.setState({ ready: true, pageType: 'edit' }));
          isPasswordValidate = false;

        } else {
          isPasswordValidate = true;
          this.setState({ ready: true });
        }

      });
  }

  componentWillUnmount() {
    this.props.resetUserForm();
  }

  handleClick = () => {
    const { pageType } = this.state;

    if (pageType === 'edit') {
      this.props.editUser();
    } else {
      this.props.addUser();
    }
  };

  renderStatus = () => {
    const status = [];

    for (const key in this.props.Admin_Users.schema.status) {
      status.push(<MenuItem key={Number(key)} value={Number(key)}>{this.props.Admin_Users.schema.status[Number(key)]}</MenuItem>);
    }

    return status;
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    return (
      <Grid item xs={12} lg={8} className={'admin-form'}>
        <FormControl fullWidth className={'admin-form_control'}>
          <FormLabel component={'legend'} className={'admin-form_label'}>
            {this.state.pageType === 'add' ? 'Добавление пользователя' : ' Редактирование пользователя'}
          </FormLabel>
          <Grid container justify={'flex-start'}>

            <Grid item xs={12} className={'admin-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} md={6} className={'admin-form_item'}>
                  <Field
                    name={'name'}
                    component={FieldText}
                    label={'Имя'}
                  />
                </Grid>

                <Grid item xs={12} md={6} className={'admin-form_item'}>
                  <Field
                    name={'email'}
                    component={FieldText}
                    label={'Почта'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'admin-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} md={6} className={'admin-form_item'}>
                  <Field
                    name={'phone'}
                    component={FieldText}
                    label={'Телефон'}
                    helperText={'Необязательно поле'}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={'admin-form_item'}>
                  <Field
                    name={'password'}
                    component={FieldText}
                    label={'Пароль'}
                  />
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} className={'admin-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} className={'admin-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Роль</InputLabel>
                    <Field
                      name={'role_id'}
                      component={FieldSelectNew}
                    >
                      {this.props.Admin_Users_Form.roles.map((item) => <MenuItem key={item.id} value={item.id}>{item.display_name}</MenuItem>)}
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'admin-form_row'} >
              <Grid container spacing={40} >
                <Grid item xs={12} className={'admin-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Статус</InputLabel>
                    <Field
                      name={'status'}
                      component={FieldSelectNew}
                    >
                      {this.renderStatus()}
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} md={2} className={'admin-form_row'}>
              <MuiButton isLoading={this.props.Admin_Users_Form.isLoading}>
                <Button
                  fullWidth
                  variant={'raised'}
                  color={'primary'}
                  className={'admin-form_btn'}
                  disabled={this.props.Admin_Users_Form.isLoading}
                  onClick={this.handleClick}
                >
                  {
                    this.state.pageType === 'add' ?
                      <Fragment>
                        <AddIcon className={'btn-icon btn-icon__left'} />
                        Добавить
                      </Fragment>
                      :
                      <Fragment>
                        <EditIcon className={'btn-icon btn-icon__left'} />
                        Изменить
                      </Fragment>
                  }
                </Button>
              </MuiButton>
            </Grid>

          </Grid>
        </FormControl>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
