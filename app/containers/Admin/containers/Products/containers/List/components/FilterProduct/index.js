import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  change as changeReduxForm
} from 'redux-form';
import FieldAmount from 'containers/Admin/components/FieldAmount';
import FieldSelectNew from 'containers/Admin/components/FieldSelectNew';

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import MuiButton from 'components/MuiButton';
import {
  applyFilter,
  resetFilter
} from '../../store/actions';

@connect(({ Admin, Admin_Products, Admin_Products_List }) => ({ Admin, Admin_Products, Admin_Products_List }), ({
  applyFilter,
  resetFilter,
  changeReduxForm
}))
@reduxForm({ form: 'Products_Filter' })
export default class FilterProduct extends Component {

  render() {
    return (
      <Grid container className={'products-filter'}>
        <Grid item xs={12}>
          <Grid container justify={'flex-start'} spacing={40}>

            <Grid item xs={12} sm={6} md={4}>
              <Field
                name={'sum_from'}
                label={'Цена от'}
                component={FieldAmount}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Field
                name={'sum_to'}
                label={'Цена до'}
                component={FieldAmount}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Наличие скидки</InputLabel>
                <Field
                  name={'has_discount'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  <MenuItem value={0}>Нет</MenuItem>
                  <MenuItem value={1}>Есть</MenuItem>
                </Field>
              </FormControl>
            </Grid>

          </Grid>

          <Grid container justify={'flex-start'} spacing={40}>
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Field
                  name={'category'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  {this.props.Admin_Products.categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Field>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Бренд</InputLabel>
                <Field
                  name={'brand'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  {this.props.Admin_Products.brands.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Field>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Сезон</InputLabel>
                <Field
                  name={'season'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  {this.props.Admin_Products.seasons.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Field>
              </FormControl>
            </Grid>

          </Grid>

          <Grid container justify={'flex-start'} spacing={40}>
            <Grid item xs={12} md={6} className={'products-filter_tags'}>
              <Grid container justify={'flex-end'} spacing={40}>
                <Grid item xs={6} md={4}>
                  <MuiButton isLoading={this.props.Admin_Products_List.isLoading}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      disabled={this.props.Admin_Products_List.isLoading}
                      onClick={this.props.resetFilter}
                    >
                      Сбросить
                    </Button>
                  </MuiButton>
                </Grid>
                <Grid item xs={6} md={4}>
                  <MuiButton isLoading={this.props.Admin_Products_List.isLoading}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Admin_Products_List.isLoading}
                      onClick={this.props.applyFilter}
                    >
                      Применить
                    </Button>
                  </MuiButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}
