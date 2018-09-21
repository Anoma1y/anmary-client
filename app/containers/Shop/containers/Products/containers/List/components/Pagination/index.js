import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TablePagination,
} from '@material-ui/core';
import { applyFilter } from '../../store/actions';

@connect(({ Shop_Products_List }) => ({ Shop_Products_List }), ({
  applyFilter
}))
export default class Pagination extends Component {

  handleChangePage = (event, page) => {
    this.props.applyFilter(page)
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
