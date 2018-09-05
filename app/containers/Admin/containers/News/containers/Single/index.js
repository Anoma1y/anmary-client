import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {
  Grid,
  Button,
  CircularProgress,
  TextField
} from '@material-ui/core';
import {
  AttachFile as AttachFileIcon,
} from '@material-ui/icons';
import {
  pullOperation,
  resetOperationSingle
} from './store/actions';
import moment from 'moment';
import _ from 'lodash';
import { amountOutput } from 'lib/amount';
import Storage from 'lib/storage';

@connect(({ Dashboard, Dashboard_Operations, Operations_Single }) => ({ Dashboard, Dashboard_Operations, Operations_Single }), ({
  pullOperation,
  resetOperationSingle,
  replace
}))
export default class Single extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.pullOperation(id)
      .finally(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetOperationSingle();
  }

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderContent = () => {
    const { id, type, category, sum, comments, currency, created_at, shift, user, tags, files } = this.props.Operations_Single.operation;
    const operation_type = _.find(this.props.Dashboard.operation_type, { id: type }).label;
    const operation_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');
    const operation_user = user.email || user.name;
    const operation_shift_started = moment(shift.started_at * 1000).format('HH:mm DD/MM/YYYY');
    const operation_shift_ended = shift.ended_at ? moment(shift.ended_at * 1000).format('HH:mm DD/MM/YYYY') : 'Активная';
    const operation_tags = tags.reduce((a, b, i) => {
      return i === 0 ? `${a}${b.name}` : `${a}, ${b.name}`;
    }, '');
    const isSuperuser = Storage.get('is_superuser') && (shift.ended_at === null);

    return (
      <Grid item xs={10} className={'operation-single'}>
        <Grid container spacing={40} className={'operation-single_row'}>
          <Grid item xs={1} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'ID'}
              value={id}
            />
          </Grid>
          <Grid item xs={2} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Тип'}
              value={operation_type}
            />
          </Grid>
          <Grid item xs={3} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Категория'}
              value={category.name}
            />
          </Grid>
          <Grid item xs={2} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Сумма'}
              value={`${new Intl.NumberFormat('en-US').format(amountOutput(sum).value)} ${currency.symbol}`}
            />
          </Grid>
          <Grid item xs={4} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата создания'}
              value={operation_created}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'operation-single_row'}>
          <Grid item xs={4} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Кассир'}
              value={operation_user}
            />
          </Grid>
          <Grid item xs={4} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Время начала смены'}
              value={operation_shift_started}
            />
          </Grid>
          <Grid item xs={4} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Время конца смены'}
              value={operation_shift_ended}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'operation-single_row'}>
          <Grid item xs={12} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              multiline
              label={'Теги'}
              value={operation_tags}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'operation-single_row'}>
          <Grid item xs={12} className={'operation-single_item'}>
            <TextField
              fullWidth
              disabled
              multiline
              label={'Комментарий'}
              value={comments}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'operation-single_row'}>
          <Grid item xs={12} className={'image-attach'}>
            {
              files.map((file) => {
                const HOST = process.env.API_HOST;
                const FILE_URI = file.original_uri.split('/');
                const FILE_NAME = FILE_URI[FILE_URI.length - 1].slice(-15);
                const UPLOAD_FILE_FORMATS = ['jpeg', 'jpg', 'png'];

                return (
                  <div className={'image-attach_item'} key={file.id}>
                    <a href={`${HOST}/${file.original_uri}`} target={'_blank'} className={'image-attach_link'}>
                      {
                        UPLOAD_FILE_FORMATS.includes(file.extension) ? (
                          <div className={'image-attach_img'}>
                            <img src={`${HOST}/${file.original_uri}`} alt={'Preview photo'} />
                          </div>
                        ) : (
                          <div className={'image-attach_icon'}>
                            <AttachFileIcon />
                          </div>
                        )
                      }
                      <p className={'image-attach_file-name'}>{FILE_NAME}</p>
                    </a>
                  </div>
                );
              })
            }
          </Grid>
        </Grid>

        {
          isSuperuser && (
            <Grid container spacing={40} className={'operation-single_row operation-single_edit-btn'}>
              <Grid item sm={12} xs={6} lg={3}>
                <Button
                  fullWidth
                  variant={'raised'}
                  onClick={() => this.props.replace(`/dashboard/operations/${id}/edit`)}
                >
                  Изменить
                </Button>
              </Grid>
            </Grid>
          )
        }

      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
