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
  Select,
  FormControl,
  MenuItem,
  TextField,
  FormHelperText,
  FormLabel,
} from '@material-ui/core';
import FieldText from 'containers/Admin/components/FieldText';
import FieldAmount from 'containers/Admin/components/FieldAmount';
import FieldSelectNew from 'containers/Admin/components/FieldSelectNew';
import MuiButton from 'components/MuiButton';
import Images from './components/Images';
import {
  uploadImage,
  removeImage,
  pullProduct,
  pullSizes,
  pullCompositions,
  addProduct,
  editProduct,
  resetFormProduct,
  addSizeProduct,
  changeCurrentSize,
  removeSizeProduct,
  changeCurrentComposition,
  changeCompositionValue,
  addCompositionProduct,
  removeCompositionProduct,
} from './store/actions';
import { getValuesDeep } from 'lib/utils';
import _ from 'lodash';

const validate = values => {
  const errors = {};

  if (!values.price) {
    errors.price = 'Обязательное поле';
  } else if (values.price <= 0) {
    errors.price = 'Сумма не может быть меньше или равна нулю';
  }

  if (!values.discount) {
    errors.discount = 'Обязательное поле';
  } else if (values.discount < 0 || values.discount > 100) {
    errors.discount = 'Скидка может быть от 0 до 100%';
  }

  if (values.description && values.description.length > 250) {
    errors.description = `Максимальная длина 250 символов (${values.description.length})`;
  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

@connect(({ Admin, Admin_Products, Products_Form }) => ({
  Admin,
  Admin_Products,
  Products_Form,
  initialValues: window.location.pathname.split('/').some((it) => it === 'new') ? null : Products_Form.product
}), ({
    uploadImage,
    pullProduct,
    pullSizes,
    pullCompositions,
    removeImage,
    addProduct,

    editProduct,
    resetFormProduct,
    changeReduxForm,

    addSizeProduct,
    changeCurrentSize,
    removeSizeProduct,

    changeCurrentComposition,
    changeCompositionValue,
    addCompositionProduct,
    removeCompositionProduct,
  }))
@reduxForm({ form: 'Products_Form', validate, enableReinitialize: true })
export default class Form extends Component {

  state = {
    ready: false,
    pageType: 'add',
    discount: 0,
    price: 0
  };

  componentDidMount() {
    if ('id' in this.props.match.params) {
      const { id } = this.props.match.params;

      Promise.all([
        this.props.pullSizes(),
        this.props.pullCompositions()
      ])
        .then(() => {
          this.props.pullProduct(id)
            .then(() => this.setState({ ready: true, pageType: 'edit' }));
        })
    //
    } else {
      Promise.all([
        this.props.pullSizes(),
        this.props.pullCompositions()
      ])
        .then(() => this.setState({ ready: true }));
    }
  }

  componentWillUnmount() {
    this.props.resetFormProduct();
  }

  calculateTotalPrice = () => {
    const { price, discount } = this.state;

    if (discount === 0) {
      return price;
    }

    return price - (price * (discount / 100));
  }

  handleImageChange = (file) => this.props.uploadImage(file);

  handleAddProduct = () => this.props.addProduct();

  handleEditProduct = () => this.props.editProduct();

  handleChangeCurrentSize = (e) => this.props.changeCurrentSize(e.target.value)

  handleChangeCurrentComposition = (e) => this.props.changeCurrentComposition(e.target.value)

  handleChangeValueComposition = (e) => {
    const { value } = e.target;

    if (value < 0 || value > 100) {
      return;
    }

    this.props.changeCompositionValue(value);
  };

  handleAddProductSize = () => {
    this.props.addSizeProduct();
  };

  handleAddProductComposition = () => {
    this.props.addCompositionProduct()
  }

  removeSizeProduct = (index) => this.props.removeSizeProduct(index);

  renderLoader = () => <CircularProgress size={24} className={'product_loading'} />;

  renderOptionSize = () => {
    const { sizes, sizesAvailable } = this.props.Products_Form;
    const sizesArray = [];

    sizesAvailable.forEach((id_sizes) => {
      const sizesFind = _.find(sizes, { id: id_sizes });
      sizesArray.push(<option key={id_sizes} value={id_sizes}>{`${sizesFind.ru} (${sizesFind.international})`}</option>);
    });

    return sizesArray;
  };

  renderOptionComposition = () => {
    const { compositions, compositionsAvailable } = this.props.Products_Form;
    const compositionsArray = [];

    compositionsAvailable.forEach((compositions_id) => {
      const compositionsFind = _.find(compositions, { id: compositions_id });
      compositionsArray.push(<option key={compositions_id} value={compositions_id}>{compositionsFind.name}</option>);
    });

    return compositionsArray;
  }

  renderSizeForm = () => {
    return (
      <div className={'product-select-form'}>
        <div className={'product-select-form-control'}>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              <FormControl className={'product-select-form-control_select'} fullWidth>
                <InputLabel>Размер</InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.props.Products_Form.currentSize}
                  onChange={this.handleChangeCurrentSize}
                >
                  <option value={''} disabled hidden />
                  {
                    this.renderOptionSize()
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} className={'product-select-form_row'}>
              <div className={'product-select-form-control_btn'}>
                <button
                  onClick={this.handleAddProductSize}
                >
                  <AddIcon />
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={'product-select-form-list'}>
          {
            this.props.Products_Form.sizesProduct.length !== 0 &&
            this.props.Products_Form.sizesProduct.map((item, index) => {

              const size = _.find(this.props.Products_Form.sizes, { id: item.size_id });

              return (
                <div key={item.id} className={'product-select-form-list_item'}>
                  <div className={'product-select-form-list_input'}>
                    {size.ru} ({size.international})
                  </div>
                  <div className={'product-select-form-control_btn'}>
                    <button
                      onClick={() => this.props.removeSizeProduct(index)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  };

  renderCompositionForm =() => {
    return (
      <div className={'product-select-form'}>
        <div className={'product-select-form-control'}>
          <Grid container spacing={24}>

            <Grid item xs={7}>
              <FormControl className={'product-select-form-control_select'} fullWidth>
                <InputLabel>Состав</InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.props.Products_Form.currentComposition}
                  onChange={this.handleChangeCurrentComposition}
                >
                  <option value={''} disabled hidden />
                  {
                    this.renderOptionComposition()
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={' '}
                value={this.props.Products_Form.currentComposition_Value}
                onChange={this.handleChangeValueComposition}
              />
            </Grid>
            <Grid item xs={2} className={'product-select-form_row'}>
              <div className={'product-select-form-control_btn'}>
                <button
                  onClick={this.handleAddProductComposition}
                >
                  <AddIcon />
                </button>
              </div>
            </Grid>
          </Grid>

        </div>
        <div className={'product-select-form-list'}>
          {
            this.props.Products_Form.compositionsProduct.length !== 0 &&
            this.props.Products_Form.compositionsProduct.map((item, index) => {
              const composition = _.find(this.props.Products_Form.compositions, { id: item.composition_id });

              return (
                <div key={item.id} className={'product-select-form-list_item'}>
                  <div className={'product-select-form-list_input'}>
                    {
                      `${composition.name} - ${item.value} %`
                    }
                  </div>
                  <div className={'product-select-form-control_btn'}>
                    <button
                      onClick={() => this.props.removeCompositionProduct(index)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }

  renderContent = () => {
    return (
      <Grid item xs={12} lg={7} className={'product-form'}>
        <FormControl fullWidth className={'product-form_control'}>
          <FormLabel component={'legend'} className={'product-form_label'}>
            Добавление товара
          </FormLabel>
          <Grid container justify={'flex-start'}>

            <Grid item xs={12} className={'product-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} md={12} className={'product-form_item'}>
                  <Field
                    name={'name'}
                    component={FieldText}
                    label={'Название'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'product-form_row'} >
              <Grid container spacing={40}>

                <Grid item xs={12} md={4} className={'product-form_item'}>
                  <Field
                    name={'price'}
                    component={FieldAmount}
                    label={'Цена'}
                    onChange={(e, value) => {
                      this.setState({
                        price: value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4} className={'product-form_item'}>
                  <Field
                    name={'discount'}
                    component={FieldAmount}
                    label={'Скидка'}
                    onChange={(e, value) => {
                      this.setState({
                        discount: value
                      })
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4} className={'product-form_item'}>
                  <TextField
                    fullWidth
                    disabled
                    label={'Сумма'}
                    value={this.calculateTotalPrice()}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'product-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} md={4} className={'product-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Категория</InputLabel>
                    <Field
                      name={'category'}
                      component={FieldSelectNew}
                    >
                      {
                        this.props.Admin_Products.categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                      }
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4} className={'product-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Бренд</InputLabel>
                    <Field
                      name={'brand'}
                      component={FieldSelectNew}
                    >
                      {
                        this.props.Admin_Products.brands.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                      }
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4} className={'product-form_item'}>
                  <FormControl fullWidth>
                    <InputLabel>Сезон</InputLabel>
                    <Field
                      name={'season'}
                      component={FieldSelectNew}
                    >
                      {
                        this.props.Admin_Products.seasons.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                      }
                    </Field>
                    <FormHelperText>Обязательное поле</FormHelperText>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} className={'product-form_row'} >
              <Grid container spacing={40}>
                <Grid item xs={12} className={'product-form_item'}>
                  <Field
                    name={'description'}
                    component={FieldText}
                    label={'Описание'}
                    helperText={'Необязательно поле'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={'product-form_row'} >
              <Grid container spacing={40}>

                <Grid item xs={12} md={6} className={'product-form_item'}>
                  {this.renderSizeForm()}
                </Grid>

                <Grid item xs={12} md={6} className={'product-form_item'}>
                  {this.renderCompositionForm()}
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} className={'product-form_row product-form_images-form'} >
              <Images
                onFileSelected={this.handleImageChange}
                disabled={false}
                isLoading={false}
                isMultiply
              />
              <Grid item xs={12} className={'image-attach'}>
                {
                  this.props.Products_Form.images.length !== 0 &&
                  this.props.Products_Form.images.map((file) => {
                    const HOST = process.env.API_HOST;
                    const FILE_URI = file.original_uri.split('/');
                    const FILE_NAME = FILE_URI[FILE_URI.length - 1].slice(-15);
                    const UPLOAD_FILE_FORMATS = ['jpeg', 'jpg', 'png'];

                    return (
                      <div className={'image-attach_item'} key={file.id}>
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
                          <Button
                            onClick={() => this.props.removeImage(file.id)}
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

            <Grid item xs={12} className={'product-form_row'}>
              <MuiButton isLoading={this.props.Products_Form.isLoading}>
                <Button
                  fullWidth
                  variant={'raised'}
                  color={'primary'}
                  className={'product-form_btn'}
                  disabled={this.props.Products_Form.isLoading}
                  onClick={() => this.state.pageType === 'add' ? this.handleAddProduct() : this.handleEditProduct()}
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
