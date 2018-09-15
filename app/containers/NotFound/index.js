import React from 'react';
import { Grid } from '@material-ui/core';
import './style.scss';

export default () => (
  <Grid item xs={12} className={'container'}>
    <div className={'error-page'}>
      <div className={'error-page_number'}>
        <h1>40<span className={'error-page_number-four'}>4</span></h1>
      </div>
      <h2>Ошибка</h2>
    </div>
  </Grid>
)
