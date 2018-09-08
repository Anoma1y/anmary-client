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
import _ from 'lodash';
import { amountOutput } from 'lib/amount';
import Storage from 'lib/storage';

@connect(({ Admin, Admin_Products, Products_Single }) => ({ Admin, Admin_Products, Products_Single }), ({
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
      .finally(() => this.setState({ ready: true }));
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
  }

  renderContent = () => {

    const { id, name, description, category, brand, season, price, discount, image, total_price, created_at, updated_at } = this.props.Products_Single.product;

    const product_price = new Intl.NumberFormat('ru-RU').format(amountOutput(price).value);
    const product_discount = discount === 0 ? 'Нет' : `${discount} %`;
    const product_total_price = new Intl.NumberFormat('ru-RU').format(amountOutput(total_price).value);
    const product_created = moment(created_at * 1000).format('HH:mm DD/MM/YYYY');
    const product_updated = moment(updated_at * 1000).format('HH:mm DD/MM/YYYY');

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
          <Grid item xs={5} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Имя'}
              value={name}
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
              value={description}
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
          <Grid item xs={4} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата создания'}
              value={product_created}
            />
          </Grid>
          <Grid item xs={4} className={'product-single_item'}>
            <TextField
              fullWidth
              disabled
              label={'Дата изменения'}
              value={product_updated}
            />
          </Grid>
        </Grid>



        <Grid container spacing={40} className={'product-single_row'}>
          <Grid item xs={12} className={'image-attach'}>
            {
              this.renderImage(image)
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
