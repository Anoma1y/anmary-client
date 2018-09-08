import React, {
  Component,
  Fragment
} from 'react';
import {
  Grid,
  Button,
  CircularProgress
} from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
} from '@material-ui/icons';

const UPLOAD_IMAGE_SIZE = 10;

/**
 * onFileSelected - обзяательный пропс, колбэк возвращающий file
 * disabled - дизейбл
 */
export default class Images extends Component {

  state = {
    fileUploadError: null,
  };

  handleImageChange = (event) => {
    event.preventDefault();

    if (!event.target.files.length) return;

    this.setState({ fileUploadError: null });

    const reader = new FileReader();
    const image = event.target.files[0];

    if ((image.size / 1024 / 1024) <= UPLOAD_IMAGE_SIZE) {
      const formData = new FormData();
      formData.append('image', image);

      this.props.onFileSelected(formData);
      reader.readAsDataURL(image);

    } else {
      this.setState({ fileUploadError: 'Больше 5 МБ' });
    }

  };

  renderUploadImageLabel = (disabled) => (
    <div className={`imgUpload-wrap ${disabled ? 'imgUpload-wrap__disabled' : ''}`}>
      <div className={'imgUpload-wrap_icon'}>
        <CloudUploadIcon />
      </div>
      <div className={'imgUpload-wrap_text'}>
        Поместите файл или
      </div>
      <Button className={'imgUpload_btn'}>
        Загрузить файл
      </Button>
    </div>
  )

  /**
   * Рендер загрузчика изображений
   * @returns {*}
   */
  renderUploadImage = (disabled) => (
    <Fragment>
      <input
        type={'file'}
        name={'fileUpload'}
        disabled={disabled}
        className={`imgUpload_input ${disabled ? 'imgUpload_input__disabled' : ''}`}
        multiple={this.props.isMultiply}
        onChange={this.handleImageChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
      {this.props.isLoading
        ? <CircularProgress className={'image_loading'} />
        : this.renderUploadImageLabel(disabled)
      }
    </Fragment>
  );

  render() {
    const {
      disabled = false
    } = this.props;
    const { fileUploadError } = this.state;

    return (
      <Grid container spacing={40} >
        <Grid item xs={12} className={'admin-form_item admin-form_files'}>
          {this.renderUploadImage(disabled)}
          {fileUploadError && <span className={'imgUpload_error'}>{this.state.fileUploadError}</span>}
        </Grid>
      </Grid>
    );
  }
}
