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
  pullCompositions,
  addNewComposition,
  setCompositionInfo,
  changeAddComposition,
  changeCompositionInfo,
  applyCompositionName,
  resetCompositionsList,
  resetCompositionInfo,
} from './store/actions';
import Storage from 'lib/storage';
import _ from 'lodash';
import './style.scss';

@connect(({ Admin_Compositions }) => ({ Admin_Compositions }), ({
  pullCompositions,
  addNewComposition,
  setCompositionInfo,
  changeAddComposition,
  changeCompositionInfo,
  applyCompositionName,
  resetCompositionsList,
  resetCompositionInfo,
  replace
}))
export default class Composition extends Component {

  state = {
    ready: false,
    edit: {
      index: 0,
      isEdit: false
    }
  };

  componentDidMount() {
    this.props.pullCompositions()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetCompositionsList();
  }

  handleOpenControl = (index) => {
    if (this.props.Admin_Compositions.isLoading) return;

    this.props.setCompositionInfo(index);
    this.setState({ edit: { index, isEdit: true } });
  };

  handleCloseControl = () => {
    this.props.resetCompositionInfo();
    this.setState({ edit: { index: -1, isEdit: false } });
  };

  handleApplyControl = () => {
    if (this.props.Admin_Compositions.isLoading) return;

    this.props.applyCompositionName(this.state.edit.index);
    this.handleCloseControl();
  };

  handleChangeCompositionInfo = (value, key) => this.props.changeCompositionInfo(key, value);

  handleAddCompositionChange = (value, key) => this.props.changeAddComposition(key, value);

  renderControl = (index) => {
    const { isLoading } = this.props.Admin_Compositions;

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

  renderInfo = (index, name, description, type) => {
    return (
      <React.Fragment>
        {
          (this.state.edit.isEdit && this.state.edit.index === index) ? (
            <Grid container spacing={24} className={'composition-list_edit'}>
              <Grid item xs={12} md={3} className={'composition-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeCompositionInfo(event.target.value, 'name')}
                  value={this.props.Admin_Compositions.compositionInfo.name}
                />
              </Grid>
              <Grid item xs={12} md={6} className={'composition-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeCompositionInfo(event.target.value, 'description')}
                  value={this.props.Admin_Compositions.compositionInfo.description}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={24}>
              <Grid item xs={12} md={3} className={'composition-list_item-input'}>
                {name}
              </Grid>
              <Grid item xs={12} md={6} className={'composition-list_item-input'}>
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
        <Grid item xs={12} lg={10} className={'composition'}>
          {
            permissions.includes('compositions-create') && (
              <Fragment>
                <Grid container spacing={40} className={'composition-add'}>
                  <Grid item xs={12} md={3} className={'composition-add_item composition-add_input'}>
                    <TextField
                      fullWidth
                      label={'Название'}
                      value={this.props.Admin_Compositions.addComposition.name}
                      onChange={(event) => this.handleAddCompositionChange(event.target.value, 'name')}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className={'composition-add_item composition-add_input'}>
                    <TextField
                      fullWidth
                      label={'Описание'}
                      value={this.props.Admin_Compositions.addComposition.description}
                      onChange={(event) => this.handleAddCompositionChange(event.target.value, 'description')}
                    />
                  </Grid>

                  <Grid item xs={12} md={2} className={'composition-add_item composition-add_btn'}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Admin_Compositions.isLoading}
                      onClick={this.props.addNewComposition}
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
          <Grid container className={'composition-list'}>
            {
              this.props.Admin_Compositions.compositions.length === 0 ? (
                <span className={'composition-list_empty'}>Нет категорий</span>
              ) : (
                this.props.Admin_Compositions.compositions.map((composition, index) => {

                  const { id, name, description, type } = composition;

                  return (
                    <Grid item xs={12} className={'composition-list_item'} key={id}>
                      <Grid container justify={'space-between'} spacing={24}>
                        <Grid item xs={12} md={9} className={'composition-list_item-content'}>
                          {this.renderInfo(index, name, description, type)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                          {permissions.includes('compositions-edit') && this.renderControl(index)}
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
