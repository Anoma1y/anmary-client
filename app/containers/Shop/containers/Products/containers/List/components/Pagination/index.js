import React, { Component } from 'react';
import {
  Grid,
  TablePagination,
} from '@material-ui/core';

export default class Pagination extends Component {

  state = {
    page: 0,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    return (
      <Grid container justify={'flex-end'}>

        <Grid item xs={6}>

          <TablePagination
            component="div"
            count={50}
            rowsPerPage={9}
            page={this.state.page}
            rowsPerPageOptions={[]}
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
