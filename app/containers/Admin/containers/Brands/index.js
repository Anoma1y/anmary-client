import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import {
  pullBrands,
  addNewBrand,
  setBrandInfo,
  changeAddBrand,
  changeBrandInfo,
  applyBrandName,
  resetBrandsList,
  resetBrandInfo,
} from './store/actions';
import Storage from 'lib/storage';
import COUNTRIES from 'lib/countries';
import _ from 'lodash';
import './style.scss';

@connect(({ Admin_Brands }) => ({ Admin_Brands }), ({
  pullBrands,
  addNewBrand,
  setBrandInfo,
  changeAddBrand,
  changeBrandInfo,
  applyBrandName,
  resetBrandsList,
  resetBrandInfo,
  replace
}))
export default class Brand extends Component {

  state = {
    ready: false,
    edit: {
      index: 0,
      isEdit: false
    }
  };

  componentDidMount() {
    this.props.pullBrands()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetBrandsList();
  }

  handleOpenControl = (index) => {
    if (this.props.Admin_Brands.isLoading) return;

    this.props.setBrandInfo(index);
    this.setState({ edit: { index, isEdit: true } });
  };

  handleCloseControl = () => {
    this.props.resetBrandInfo();
    this.setState({ edit: { index: -1, isEdit: false } });
  };

  handleApplyControl = () => {
    if (this.props.Admin_Brands.isLoading) return;

    this.props.applyBrandName(this.state.edit.index);
    this.handleCloseControl();
  };

  handleChangeBrandInfo = (value, key) => this.props.changeBrandInfo(key, value);

  handleAddBrandChange = (value, key) => this.props.changeAddBrand(key, value);

  renderControl = (index) => {
    const { isLoading } = this.props.Admin_Brands;

    return (
      <div className={'control_edit'}>
        {
          (this.state.edit.isEdit && this.state.edit.index === index) ? (
            <React.Fragment>
              <Button
                className={'control_edit-btn control_edit__apply'}
                onClick={() => this.handleApplyControl()}
                disabled={isLoading}
              >
                <CheckIcon />
              </Button>
              <Button
                className={'control_edit-btn control_edit__close'}
                onClick={() => this.handleCloseControl()}
                disabled={isLoading}
              >
                <CloseIcon />
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                className={'control_edit-btn control_edit__rename'}
                onClick={() => this.handleOpenControl(index)}
                disabled={isLoading}
              >
                <EditIcon />
              </Button>
            </React.Fragment>
          )
        }
      </div>
    );
  };

  renderInfo = (index, name, description, country) => {
    return (
      <React.Fragment>
        {
          (this.state.edit.isEdit && this.state.edit.index === index) ? (
            <Grid container spacing={24} className={'brand-list_edit'}>
              <Grid item xs={12} md={3} className={'brand-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeBrandInfo(event.target.value, 'name')}
                  value={this.props.Admin_Brands.brandInfo.name}
                />
              </Grid>
              <Grid item xs={12} md={3} className={'brand-list_edit-select'}>
                <Select
                  fullWidth
                  onChange={(event) => this.handleChangeBrandInfo(event.target.value, 'country')}
                  value={this.props.Admin_Brands.brandInfo.country}
                >
                  {COUNTRIES.map((item) => <MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>)}
                </Select>
              </Grid>
              <Grid item xs={12} md={6} className={'brand-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeBrandInfo(event.target.value, 'description')}
                  value={this.props.Admin_Brands.brandInfo.description}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={24}>
              <Grid item xs={12} md={3} className={'brand-list_item-input'}>
                {name}
              </Grid>
              <Grid item xs={12} md={3} className={'brand-list_item-input'}>
                {_.find(COUNTRIES, { key: country.toUpperCase() }).label || ''}
              </Grid>
              <Grid item xs={12} md={6} className={'brand-list_item-input'}>
                {description}
              </Grid>
            </Grid>
          )
        }
      </React.Fragment>
    );
  };

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => {
    const { permissions } = Storage.get('permissions');

    return (
      <Grid container className={'admin'}>
        <Grid item xs={12} lg={10} className={'brand'}>
          {
            permissions.includes('brands-create') && (
              <Fragment>
                <Grid container spacing={40} className={'brand-add'}>
                  <Grid item xs={12} md={3} className={'brand-add_item brand-add_input'}>
                    <TextField
                      fullWidth
                      label={'Название'}
                      value={this.props.Admin_Brands.addBrand.name}
                      onChange={(event) => this.handleAddBrandChange(event.target.value, 'name')}
                    />
                  </Grid>

                  <Grid item xs={12} md={3} className={'brand-add_item brand-add_select'}>
                    <FormControl fullWidth>
                      <InputLabel>Страна</InputLabel>
                      <Select
                          value={this.props.Admin_Brands.addBrand.country}
                          onChange={(event) => this.handleAddBrandChange(event.target.value, 'country')}
                        >
                        {COUNTRIES.map((item) => <MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4} className={'brand-add_item brand-add_input'}>
                    <TextField
                      fullWidth
                      label={'Описание'}
                      value={this.props.Admin_Brands.addBrand.description}
                      onChange={(event) => this.handleAddBrandChange(event.target.value, 'description')}
                    />
                  </Grid>

                  <Grid item xs={12} md={2} className={'brand-add_item brand-add_btn'}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Admin_Brands.isLoading}
                      onClick={this.props.addNewBrand}
                    >
                      <AddIcon />
                      Добавить
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Fragment>
            )
          }
          <Grid container className={'brand-list'}>
            {
              this.props.Admin_Brands.brands.length === 0 ? (
                <span className={'brand-list_empty'}>Нет брендов</span>
              ) : (
                this.props.Admin_Brands.brands.map((brand, index) => {

                  const { id, name, description, country } = brand;

                  return (
                    <Grid item xs={12} className={'brand-list_item'} key={id}>
                      <Grid container justify={'space-between'} spacing={24}>
                        <Grid item xs={12} md={9} className={'brand-list_item-content'}>
                          {this.renderInfo(index, name, description, country)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                          {permissions.includes('brands-edit') && this.renderControl(index)}
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              )
            }
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
