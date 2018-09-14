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
  pullProduct,
  resetProductSingle
} from './store/actions';
import moment from 'moment';
import { amountOutput } from 'lib/amount';
import _ from 'lodash';

@connect(({ Admin, Admin_Products, Admin_Products_Single }) => ({ Admin, Admin_Products, Admin_Products_Single }), ({
  pullProduct,
  resetProductSingle,
  replace,
}))
export default class Single extends Component {

  state = {
    ready: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.pullProduct(id)
      .then(() => this.setState({ ready: true }));
  }

  componentWillUnmount() {
    this.props.resetProductSingle();
  }

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderImage = (file) => {
    const HOST = `${process.env.API_HOST}`;
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
      </div>
    );
  };

  renderContent = () => {

    const {
      id,
      name,
      article,
      description,
      category,
      brand,
      season,
      compositions,
      sizes,
      price,
      discount,
      images,
      total_price,
      is_available,
      created_at,
      updated_at
    } = this.props.Admin_Products_Single.product;

    const product_name = name.length === 0 ? '-' : name;
    const product_price = new Intl.NumberFormat('ru-RU').format(amountOutput(price).value);
    const product_discount = discount === 0 ? 'Нет' : `${discount} %`;
    const product_description = description.length === 0 ? '-' : description;
    const product_total_price = new Intl.NumberFormat('ru-RU').format(amountOutput(total_price).value);
    const product_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');
    const product_updated = moment(updated_at * 1000).format('HH:mm DD/MM/YYYY');
    const product_available = is_available ? 'Есть' : 'Нет';

    return (
      <Grid item xs={10} className={'product-single'}>
        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={1} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'ID'}
              value={id}
            />
          </Grid>
          <Grid item xs={3} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Имя'}
              value={product_name}
            />
          </Grid>
          <Grid item xs={2} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Артикль'}
              value={article}
            />
          </Grid>
          <Grid item xs={2} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Цена'}
              value={product_price}
            />
          </Grid>
          <Grid item xs={2} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Скидка'}
              value={product_discount}
            />
          </Grid>
          <Grid item xs={2} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Сумма'}
              value={product_total_price}
            />
          </Grid>
        </Grid>
        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={12} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              multiline
              label={'Описание'}
              value={product_description}
            />
          </Grid>
        </Grid>
        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={4} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Категория'}
              value={category.name}
            />
          </Grid>
          <Grid item xs={4} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Бренд'}
              value={brand.name}
            />
          </Grid>
          <Grid item xs={4} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Сезон'}
              value={season.name}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={6} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Состав'}
              value={sizes.reduce((a, b, i) => {
                const size = _.find(this.props.Admin_Products.sizes, { id: b.size_id });
                return a + `${size && (`${size.ru} (${size.international}`)})${sizes.length === i + 1 ? '' : ', '}`;
              }, '')}
            />
          </Grid>
          <Grid item xs={6} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Размеры'}
              value={compositions.reduce((a, b, i) => {
                const composition = _.find(this.props.Admin_Products.compositions, { id: b.composition_id });
                return a + `${composition && composition.name} ${b.value}%${compositions.length === i + 1 ? '' : ', '}`;
              }, '')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={5} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата создания'}
              value={product_created}
            />
          </Grid>
          <Grid item xs={5} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата изменения'}
              value={product_updated}
            />
          </Grid>
          <Grid item xs={2} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Наличие'}
              value={product_available}
            />
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={12} className={'image-attach'}>
            {
              images.map((image) => this.renderImage(image))
            }
          </Grid>
        </Grid>

        <Grid container spacing={40} className={'product-single_row product-single_edit-btn'}>
          <Grid item sm={12} xs={6} lg={3}>
            <Button
              fullWidth
              variant={'raised'}
              onClick={() => this.props.replace(`/admin/products/${id}/edit`)}
            >
              Изменить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
