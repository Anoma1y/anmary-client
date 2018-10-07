import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableHead
} from '@material-ui/core';

@connect(({ Shop_Products }) => ({ Shop_Products }))
export default class SizeInfo extends Component {
  render() {
    const { sizes } = this.props.Shop_Products;

    return (
      <Grid container className={'size-info'}>
        <Grid item xs={12} className={'size-info_wrapper'}>

          <Table className={'size-info-table'}>
            <caption className={'size-info_caption'}>Таблица размеров</caption>
            <TableHead className={'size-info-head'}>
              <TableRow className={'size-info-head_row'}>
                <TableCell className={'size-info-head_cell'}>Российский размер</TableCell>
                <TableCell className={'size-info-head_cell'}>Международный размер</TableCell>
                <TableCell className={'size-info-head_cell'}>Обхват груди (см)</TableCell>
                <TableCell className={'size-info-head_cell'}>Обхват талии (см)</TableCell>
                <TableCell className={'size-info-head_cell'}>Обхват бедер (см)</TableCell>
                <TableCell className={'size-info-head_cell'}>Длина рукава (см)</TableCell>
                <TableCell className={'size-info-head_cell'}>Англия (UK)</TableCell>
                <TableCell className={'size-info-head_cell'}>США (US)</TableCell>
                <TableCell className={'size-info-head_cell'}>Европа (EU)</TableCell>
                <TableCell className={'size-info-head_cell'}>Италия (IT)</TableCell>
                <TableCell className={'size-info-head_cell'}>Япония (JP)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={'size-info-body'}>
              {
                sizes && sizes.map((size) => (
                  <TableRow key={size.id} className={'size-info-body_row'}>
                    <TableCell className={'size-info-body_cell'}>{size.ru}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.international}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.chest}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.waist}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.thigh}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.sleeve}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.uk}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.us}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.eu}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.it}</TableCell>
                    <TableCell className={'size-info-body_cell'}>{size.jp}</TableCell>

                  </TableRow>
                ))
              }
            </TableBody>
          </Table>

        </Grid>
      </Grid>
    );
  }
}
