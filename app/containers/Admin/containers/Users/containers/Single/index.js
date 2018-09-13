import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  CardHeader,
} from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import {
  pullUser,
  resetUserSingle
} from './store/actions';

@connect(({ Admin_Users, Admin_Users_Single }) => ({ Admin_Users, Admin_Users_Single }), ({
  pullUser,
  resetUserSingle,
  replace
}))
export default class Single extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.pullUser(id)
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetUserSingle();
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    return (
      <Grid item xs={10}>
        <Card className={'user-single'}>
          <CardHeader
            avatar={<PersonIcon />}
            className={'user-single_header'}
            title={`Имя: ${this.props.Admin_Users_Single.user.name}`}
            subheader={`E-Mail: ${this.props.Admin_Users_Single.user.email}`}
          />
          <CardContent className={'user-single_content'}>
            <p className={'user-single_text'}>
              Телефон: <span>{this.props.Admin_Users_Single.user.profile.phone === '' ? 'не указан' : this.props.Admin_Users_Single.user.profile.phone}</span>
            </p>
            <p className={'user-single_text'}>
              Статус: <span>{this.props.Admin_Users.schema.status[this.props.Admin_Users_Single.user.profile.status]}</span>
            </p>
            <p className={'user-single_text'}>
              Роль: {this.props.Admin_Users_Single.user.roles.map((role) => <span key={role.name}>{`${role.display_name} `}</span>)}
            </p>
          </CardContent>
          <CardActions className={'user-single_btn'}>
            <Button
              variant={'raised'}
              onClick={() => this.props.replace(`/admin/users/${this.props.Admin_Users_Single.user.id}/edit`)}
            >
              Изменить
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
