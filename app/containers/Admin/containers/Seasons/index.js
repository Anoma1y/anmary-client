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
  pullSeasons,
  addNewSeason,
  setSeasonInfo,
  changeAddSeason,
  changeSeasonInfo,
  applySeasonName,
  resetSeasonsList,
  resetSeasonInfo,
} from './store/actions';
import Storage from 'lib/storage';
import './style.scss';

@connect(({ Admin_Seasons }) => ({ Admin_Seasons }), ({
  pullSeasons,
  addNewSeason,
  setSeasonInfo,
  changeAddSeason,
  changeSeasonInfo,
  applySeasonName,
  resetSeasonsList,
  resetSeasonInfo,
  replace
}))
export default class Season extends Component {

  state = {
    ready: false,
    edit: {
      index: 0,
      isEdit: false
    }
  };

  componentDidMount() {
    this.props.pullSeasons()
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetSeasonsList();
  }

  handleOpenControl = (index) => {
    if (this.props.Admin_Seasons.isLoading) return;

    this.props.setSeasonInfo(index);
    this.setState({ edit: { index, isEdit: true } });
  };

  handleCloseControl = () => {
    this.props.resetSeasonInfo();
    this.setState({ edit: { index: -1, isEdit: false } });
  };

  handleApplyControl = () => {
    if (this.props.Admin_Seasons.isLoading) return;

    this.props.applySeasonName(this.state.edit.index);
    this.handleCloseControl();
  };

  handleChangeSeasonInfo = (value, key) => this.props.changeSeasonInfo(key, value);

  handleAddSeasonChange = (value, key) => this.props.changeAddSeason(key, value);

  renderControl = (index) => {
    const { isLoading } = this.props.Admin_Seasons;

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
            <Grid container spacing={24} className={'season-list_edit'}>
              <Grid item xs={12} md={3} className={'season-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeSeasonInfo(event.target.value, 'name')}
                  value={this.props.Admin_Seasons.seasonInfo.name}
                />
              </Grid>
              <Grid item xs={12} md={6} className={'season-list_edit-input'}>
                <TextField
                  fullWidth
                  onChange={(event) => this.handleChangeSeasonInfo(event.target.value, 'description')}
                  value={this.props.Admin_Seasons.seasonInfo.description}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={24}>
              <Grid item xs={12} md={3} className={'season-list_item-input'}>
                {name}
              </Grid>
              <Grid item xs={12} md={6} className={'season-list_item-input'}>
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
        <Grid item xs={12} lg={10} className={'season'}>
          {
            permissions.includes('seasons-create') && (
              <Fragment>
                <Grid container spacing={40} className={'season-add'}>
                  <Grid item xs={12} md={3} className={'season-add_item season-add_input'}>
                    <TextField
                      fullWidth
                      label={'Название'}
                      value={this.props.Admin_Seasons.addSeason.name}
                      onChange={(event) => this.handleAddSeasonChange(event.target.value, 'name')}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className={'season-add_item season-add_input'}>
                    <TextField
                      fullWidth
                      label={'Описание'}
                      value={this.props.Admin_Seasons.addSeason.description}
                      onChange={(event) => this.handleAddSeasonChange(event.target.value, 'description')}
                    />
                  </Grid>

                  <Grid item xs={12} md={2} className={'season-add_item season-add_btn'}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Admin_Seasons.isLoading}
                      onClick={this.props.addNewSeason}
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
          <Grid container className={'season-list'}>
            {
              this.props.Admin_Seasons.seasons.length === 0 ? (
                <span className={'season-list_empty'}>Нет сезонов</span>
              ) : (
                this.props.Admin_Seasons.seasons.map((season, index) => {

                  const { id, name, description } = season;

                  return (
                    <Grid item xs={12} className={'season-list_item'} key={id}>
                      <Grid container justify={'space-between'} spacing={24}>
                        <Grid item xs={12} md={9} className={'season-list_item-content'}>
                          {this.renderInfo(index, name, description)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                          {permissions.includes('seasons-edit') && this.renderControl(index)}
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
