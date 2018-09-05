import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import {
  Field,
  change as changeReduxForm,
  reduxForm
} from 'redux-form';
import {
  Add as AddIcon,
  Edit as EditIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import {
  Grid,
  Button,
  InputLabel,
  CircularProgress,
  FormControl,
  MenuItem,
  FormHelperText,
  FormLabel,
} from '@material-ui/core';
import FieldText from 'containers/Dashboard/components/FieldText';
import FieldAmount from 'containers/Dashboard/components/FieldAmount';
import FieldSelectNew from 'containers/Dashboard/components/FieldSelectNew';
import MuiButton from 'components/MuiButton';
import Tags from './components/Tags';
import Files from './components/Files';
import {
  uploadFile,
  removeFile,
  pullOperation,
  addOperation,
  editOperation,
  resetFormOperation,
  setOperationType,
} from './store/actions';
import { getValuesDeep } from 'lib/utils';

const validate = values => {
  const errors = {};

  if (!values.sum) {
    errors.sum = 'Обязательное поле';
  } else if (values.sum <= 0) {
    errors.sum = 'Сумма не может быть меньше или равна нулю';
  }

  if (values.comments && values.comments.length > 250) {
    errors.comments = `Максимальная длина 250 символов (${values.comments.length})`;
  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

@connect(({ Dashboard, Dashboard_Operations, Operations_Form }) => ({
  Dashboard,
  Dashboard_Operations,
  Operations_Form,
  initialValues: window.location.pathname.split('/').some((it) => it === 'new') ? null : Operations_Form.operation
}), ({
    uploadFile,
    pullOperation,
    removeFile,
    addOperation,
    editOperation,
    resetFormOperation,
    setOperationType,
    changeReduxForm,
  }))
@reduxForm({ form: 'Operations_Form', validate, enableReinitialize: true })
export default class Form extends Component {

  state = {
    ready: false,
    pageType: 'add'
  };

  componentDidMount() {
    if ('id' in this.props.match.params) {
      const { id } = this.props.match.params;

      this.props.pullOperation(id)
        .then(() => this.setState({ ready: true, pageType: 'edit' }));

    } else {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.props.resetFormOperation();
  }

  handleImageChange = (file) => this.props.uploadFile(file);

  handleAddOperation = () => this.props.addOperation();

  handleEditOperation = () => this.props.editOperation();

  renderLoader = () => <CircularProgress size={24} className={'dashboard_loading'} />;

  renderContent = () => {
    return (
      <Grid item xs={12} lg={7} className={'dashboard-form'}>
        <FormControl fullWidth className={'dashboard-form_control'}>
          <FormLabel component={'legend'} className={'dashboard-form_label'}>
            Добавление операции
          </FormLabel>
          <Grid container justify={'flex-start'}>

            <Grid item xs={12} className={'dashboard-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} md={3} className={'dashboard-form_item'}>

                  <FormControl fullWidth>
                    <InputLabel>Тип</InputLabel>
                    <Field
                      name={'type'}
                      component={FieldSelectNew}
                      onChange={(e, value) => {
                        this.props.setOperationType(value)
                        this.props.changeReduxForm('Operations_Form', 'category', null);
                      }}
                    >
                      {this.props.Dashboard.operation_type.map((item) => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3} className={'dashboard-form_item'}>
                  <Field
                    name={'sum'}
                    component={FieldAmount}
                    label={'Сумма'}
                  />
                </Grid>

                <Grid item xs={12} md={6} className={'dashboard-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Валюта</InputLabel>
                    <Field
                      name={'currency'}
                      component={FieldSelectNew}
                    >
                      {this.props.Dashboard_Operations.currency.map((item) => <MenuItem key={item.id} value={item.id}>{`${item.name} (${item.symbol})`}</MenuItem>)}
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'dashboard-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} className={'dashboard-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Категория</InputLabel>
                    <Field
                      name={'category'}
                      component={FieldSelectNew}
                    >
                      {
                        this.props.Dashboard_Operations.category.map((item) => {
                          if (this.props.Operations_Form.operation_type === item.type) {
                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
                          }
                        })
                      }
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} className={'dashboard-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} className={'dashboard-form_item'}>
                  <Field
                    name={'comments'}
                    component={FieldText}
                    label={'Комментарий'}
                    helperText={'Необязательно поле'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'dashboard-form_row'} >
              <Tags />
            </Grid>

            <Grid item xs={12} className={'dashboard-form_row'} >
              <Files
                onFileSelected={this.handleImageChange}
                disabled={false}
                isLoading={false}
                isMultiply
              />
              <Grid item xs={12} className={'image-attach'}>
                {
                  this.props.Operations_Form.files.length !== 0 &&
                  this.props.Operations_Form.files.map((file) => {
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
                        <div className={'image-attach_btn'}>
                          <Button
                            onClick={() => this.props.removeFile(file.id)}
                          >
                            <CloseIcon /> Удалить
                          </Button>
                        </div>
                      </div>
                    )
                  })
                }
              </Grid>
            </Grid>

            <Grid item xs={12} className={'dashboard-form_row'}>
              <MuiButton isLoading={this.props.Operations_Form.isLoading}>
                <Button
                  fullWidth
                  variant={'raised'}
                  color={'primary'}
                  className={'dashboard-form_btn'}
                  disabled={this.props.Operations_Form.isLoading}
                  onClick={() => this.state.pageType === 'add' ? this.handleAddOperation() : this.handleEditOperation()}
                >
                  {
                    this.state.pageType === 'add' ? (
                      <Fragment>
                        <AddIcon className={'btn-icon btn-icon__left'} />
                        Добавить
                      </Fragment>
                    ) : (
                      <Fragment>
                        <EditIcon className={'btn-icon btn-icon__left'} />
                        Изменить
                      </Fragment>
                    )
                  }
                </Button>
              </MuiButton>
            </Grid>

          </Grid>
        </FormControl>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
