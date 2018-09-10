import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
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
  pullCategories,
  addNewCategory,
  setCategoryInfo,
  changeAddCategory,
  changeCategoryInfo,
  applyCategoryName,
  resetCategoriesList,
  resetCategoryInfo,
} from './store/actions';
import Storage from 'lib/storage';
import './style.scss';

@connect(({ Admin_Categories }) => ({ Admin_Categories }), ({
  pullCategories,
  addNewCategory,
  setCategoryInfo,
  changeAddCategory,
  changeCategoryInfo,
  applyCategoryName,
  resetCategoriesList,
  resetCategoryInfo,
  replace
}))
export default class Categories extends Component {

  state = {
    ready: false,
    edit: {
      index: 0,
      isEdit: false
    }
  };

  componentDidMount() {
    this.props.pullCategories()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetCategoriesList();
  }

  handleOpenControl = (index) => {
    if (this.props.Admin_Categories.isLoading) return;

    this.props.setCategoryInfo(index);
    this.setState({ edit: { index, isEdit: true } });
  };

  handleCloseControl = () => {
    this.props.resetCategoryInfo();
    this.setState({ edit: { index: -1, isEdit: false } });
  };

  handleApplyControl = () => {
    if (this.props.Admin_Categories.isLoading) return;

    this.props.applyCategoryName(this.state.edit.index);
    this.handleCloseControl();
  };

  handleChangeCategoryInfo = (value, key) => this.props.changeCategoryInfo(key, value);

  handleAddCategoryChange = (value, key) => this.props.changeAddCategory(key, value);

  renderControl = (index) => {
    const { isLoading } = this.props.Admin_Categories;

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

  renderInfo = (index, name, description) => {
    return (
      <React.Fragment>
        {
          (this.state.edit.isEdit && this.state.edit.index === index) ? (
            <Grid container spacing={24} className={'category-list_edit'}>
              <Grid item xs={12} md={3} className={'category-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeCategoryInfo(event.target.value, 'name')}
                  value={this.props.Admin_Categories.categoryInfo.name}
                />
              </Grid>
              <Grid item xs={12} md={3} className={'category-list_edit-select'}>

              </Grid>
              <Grid item xs={12} md={6} className={'category-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeCategoryInfo(event.target.value, 'description')}
                  value={this.props.Admin_Categories.categoryInfo.description}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={24}>
              <Grid item xs={12} md={3} className={'category-list_item-input'}>
                {name}
              </Grid>
              <Grid item xs={12} md={6} className={'category-list_item-input'}>
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
        <Grid item xs={12} lg={10} className={'category'}>
          {
            permissions.includes('categories-create') && (
              <Fragment>
                <Grid container spacing={40} className={'category-add'}>
                  <Grid item xs={12} md={4} className={'category-add_item category-add_input'}>
                    <TextField
                      fullWidth
                      label={'Название'}
                      value={this.props.Admin_Categories.addCategory.name}
                      onChange={(event) => this.handleAddCategoryChange(event.target.value, 'name')}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} className={'category-add_item category-add_input'}>
                    <TextField
                      fullWidth
                      label={'Описание'}
                      value={this.props.Admin_Categories.addCategory.description}
                      onChange={(event) => this.handleAddCategoryChange(event.target.value, 'description')}
                    />
                  </Grid>

                  <Grid item xs={12} md={2} className={'category-add_item category-add_btn'}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Admin_Categories.isLoading}
                      onClick={this.props.addNewCategory}
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
          <Grid container className={'category-list'}>
            {
              this.props.Admin_Categories.categories.length === 0 ? (
                <span className={'category-list_empty'}>Нет категорий</span>
              ) : (
                this.props.Admin_Categories.categories.map((category, index) => {

                  const { id, name, description } = category;

                  return (
                    <Grid item xs={12} className={'category-list_item'} key={id}>
                      <Grid container justify={'space-between'} spacing={24}>
                        <Grid item xs={12} md={9} className={'category-list_item-content'}>
                          {this.renderInfo(index, name, description)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                          {permissions.includes('categories-edit') && this.renderControl(index)}
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
