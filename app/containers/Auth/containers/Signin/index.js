import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import MuiButton from 'components/MuiButton';
import {
  changeLogin,
  changePassword,
  resetAuthSignin,
  signin,
} from './store/actions';

@connect(({ Auth_Signin }) => ({ Auth_Signin }), ({
  changeLogin,
  changePassword,
  resetAuthSignin,
  signin,
}))
export default class Signin extends Component {

  state = {
    validation: {
      email: false,
      password: false
    }
  }

  componentWillUnmount() {
    this.props.resetAuthSignin();
  }

  handleChangeEmail = (event) => {
    const { value } = event.target;

    this.setState({
      validation: {
        ...this.state.validation,
        email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      }
    });

    this.props.changeLogin(value);
  };

  handleChangePassowrd = (event) => {
    const { value } = event.target;

    this.setState({
      validation: {
        ...this.state.validation,
        password: value.length < 6
      }
    });

    this.props.changePassword(value);
  };

  handleSignin = () => this.props.signin();

  render() {
    const {
      email,
      password,
      isLoading,
      error
    } = this.props.Auth_Signin;

    return (
      <Grid item xs={12}>
        <Grid container justify={'center'}>
          <Grid item xs={12} className={'auth_title'}>
            <Typography variant={'title'}>
              Касса
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container justify={'center'} className={'auth-form'}>
              <Grid item xs={12} className={'auth-form-wrapper'}>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className={'auth-form_item'}>
                    <TextField
                      fullWidth
                      autoComplete={'off'}
                      label={'E-Mail'}
                      value={email}
                      onChange={this.handleChangeEmail}
                      error={this.state.validation.email}
                      helperText={this.state.validation.email ? 'Неверный адрес электронной почты' : 'Обязательное поле'}
                    />
                  </div>
                  <div className={'auth-form_item'}>
                    <TextField
                      fullWidth
                      autoComplete={'off'}
                      label={'Пароль'}
                      value={password}
                      type={'password'}
                      onChange={this.handleChangePassowrd}
                      error={this.state.validation.password}
                      helperText={this.state.validation.password ? 'Пароль должен содержать более 6 символов' : 'Обязательное поле'}
                    />
                  </div>
                  <div className={'auth-form_item'}>
                    <div className={'auth-error'}>
                      <span className={'auth_error'}>
                        {error}
                      </span>
                    </div>
                    <MuiButton isLoading={isLoading}>
                      <Button
                        fullWidth
                        type={'submit'}
                        variant={'raised'}
                        color={'primary'}
                        className={'auth-form_btn'}
                        disabled={isLoading}
                        onClick={this.handleSignin}
                      >
                        Войти
                      </Button>
                    </MuiButton>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
