import React, { Component } from 'react';
import {
  Grid
} from '@material-ui/core';
import Header from './containers/Header';

export default class Main extends Component {
  render() {
    return (
      <Grid container>
        <Header />
      </Grid>
    );
  }
}
