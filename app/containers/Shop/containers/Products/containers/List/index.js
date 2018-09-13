import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Grid
} from '@material-ui/core';


@connect(({ Shop_Products, Shop_Products_List }) => ({ Shop_Products, Shop_Products_List }))
export default class List extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}
