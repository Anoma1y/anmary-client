import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TablePagination,
} from '@material-ui/core';

@connect(({ Shop_Products_List }) => ({ Shop_Products_List }))
export default class Pagination extends Component {

  state = {
    page: 0,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {
      page,
      total_records,
    } = this.props.Shop_Products_List;

    return (
      <Grid container justify={'flex-end'}>

        <Grid item xs={6}>

          <TablePagination
            component={'div'}
            count={total_records}
            rowsPerPage={9}
            page={page}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />

        </Grid>

      </Grid>
    );
  }
}
