import React, {
  Component,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm
} from 'redux-form';
import {
  Add as AddIcon,
  Edit as EditIcon,
  AttachFile as AttachFileIcon, Close as CloseIcon,
} from '@material-ui/icons';
import {
  Grid,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import FieldText from 'containers/Admin/components/FieldText';
import FieldTextArea from 'containers/Admin/components/FieldTextArea';
import MuiButton from 'components/MuiButton';
import Images from './components/Images';
import {
  uploadImage,
  pullNews,
  resetFormNews,
  addNews,
  editNews,
  removeImage,
} from './store/actions';
import { getValuesDeep } from 'lib/utils';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Обязательное поле';
  }

  if (!values.content) {
    errors.content = 'Обязательное поле';
  }

  if (values.content && values.content.length > 250) {
    errors.content = `Максимальная длина 250 символов (${values.content.length})`;
  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

@connect(({ Admin, Admin_News, Admin_News_Form }) => ({
  Admin,
  Admin_News,
  Admin_News_Form,
  initialValues: window.location.pathname.split('/').some((it) => it === 'new') ? null : Admin_News_Form.news
}), ({
    uploadImage,
    pullNews,
    resetFormNews,
    addNews,
    editNews,
    removeImage,
  }))
@reduxForm({ form: 'Admin_News_Form', validate, enableReinitialize: true })
export default class Form extends Component {

  state = {
    ready: false,
    pageType: 'add',
  };

  componentDidMount() {
    if ('id' in this.props.match.params) {
      const { id } = this.props.match.params;

      this.props.pullNews(id)
        .then(() => this.setState({
          ready: true,
          pageType: 'edit',
        }));
    } else {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.props.resetFormNews();
  }

  handleImageChange = (file) => this.props.uploadImage(file);

  handleAddNews = () => this.props.addNews();

  handleEditNews = () => this.props.editNews();

  renderLoader = () => <CircularProgress size={24} className={'product_loading'} />;

  renderImage = (file) => {
    const HOST = process.env.API_HOST;
    const FILE_URI = file.original_uri.split('/');
    const FILE_NAME = FILE_URI[FILE_URI.length - 1].slice(-15);
    const UPLOAD_FILE_FORMATS = ['jpeg', 'jpg', 'png'];

    return (
      <div className={'image-attach_item'}>
        <a href={`${HOST}${file.original_uri}`} target={'_blank'} className={'image-attach_link'}>
          {
            UPLOAD_FILE_FORMATS.includes(file.extension) ? (
              <div className={'image-attach_img'}>
                <img src={`${HOST}${file.original_uri}`} alt={'Preview photo'} />
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
          <Grid container>
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={() => this.props.removeImage(file.id)}
              >
                <CloseIcon /> Удалить
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }

  renderContent = () => (
    <Grid item xs={12} lg={7} className={'admin-form'}>
      <FormControl fullWidth className={'admin-form_control'}>
        <FormLabel component={'legend'} className={'admin-form_label'}>
          Добавление новости
        </FormLabel>
        <Grid container justify={'flex-start'}>

          <Grid item xs={12} className={'admin-form_row'} >
            <Grid container spacing={40}>

              <Grid item xs={12} md={12} className={'admin-form_item'}>
                <Field
                  name={'name'}
                  component={FieldText}
                  label={'Название'}
                  helperText={'Обязательно поле'}
                />
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={12} className={'admin-form_row'} >
            <Grid container spacing={40}>
              <Grid item xs={12} className={'admin-form_item'}>
                <Field
                  name={'content'}
                  component={FieldTextArea}
                  label={'Текст'}
                  rows={6}
                  helperText={'Обязательно поле'}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={'admin-form_row admin-form_images-form'} >
            <Images
              onFileSelected={this.handleImageChange}
              disabled={false}
              isLoading={false}
              isMultiply
            />
            <Grid item xs={12} className={'image-attach'}>
              {
                (this.props.Admin_News_Form.image && this.props.Admin_News_Form.image.id) && this.renderImage(this.props.Admin_News_Form.image)
              }
            </Grid>
          </Grid>

          <Grid item xs={12} className={'admin-form_row'}>
            <MuiButton isLoading={this.props.Admin_News_Form.isLoading}>
              <Button
                fullWidth
                variant={'raised'}
                color={'primary'}
                className={'admin-form_btn'}
                disabled={this.props.Admin_News_Form.isLoading}
                onClick={() => this.state.pageType === 'add' ? this.handleAddNews() : this.handleEditNews()}
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

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
