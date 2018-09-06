import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { logout } from 'containers/Auth/containers/Signin/store/actions';

// @connect(null, ({ logout }))
export default class Logout extends Component {

  // handleLogout = () => this.props.logout();

  render() {
    return (
      <button
        className={'logout'}
        // onClick={this.handleLogout}
      >
        Выход
      </button>
    );
  }
}
