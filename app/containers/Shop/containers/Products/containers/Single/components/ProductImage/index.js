import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { changeMainImage } from '../../store/actions';
import _ from 'lodash';

@connect(({ Shop_Products_Single }) => ({ Shop_Products_Single }), ({
  changeMainImage
}))
export default class ProductImage extends Component {

  componentDidMount() {
    const { images } = this.props.Shop_Products_Single.product;
    const mainImage = _.find(images, { is_default: true }) || images[0];

    this.props.changeMainImage(mainImage);
  }

  handleMainImage = (image) => {
    const { mainImage } = this.props.Shop_Products_Single;

    if (mainImage.id === image.id) return;

    this.props.changeMainImage(image);
  };

  render() {
    const { product: { images }, mainImage } = this.props.Shop_Products_Single;
    const HOST = `${process.env.API_HOST}`;
    const imagesThumb = _.sortBy(images, [(o) => !o.is_default]);

    return (
      <Grid container spacing={40} className={'product-detail-images'}>

        <Grid item xs={3} className={'product-detail-images-thumbnails'}>

          <div className={'product-detail-images-thumbnails_list'}>

            {
              imagesThumb.map((image) => (
                <div
                  key={image.id}
                  className={'product-detail-images-thumbnails_item'}
                  onClick={() => this.handleMainImage(image)}
                >
                  <img
                    src={`${HOST}${image.original_uri}`}
                    alt={'Thumbnails'}
                    className={`product-detail-images-thumbnails_img${mainImage.id === image.id ? ' product-detail-images-thumbnails_img__selected' : ''}`}
                  />
                </div>
              ))
            }

          </div>

        </Grid>

        <Grid item xs={9} className={'product-detail-images-detail'}>
          <div className={'product-detail-images-detail_wrapper'}>
            <img
              className={'product-detail-images-detail_img'}
              src={`${HOST}${mainImage.original_uri}`}
              alt={'Detail'}
            />
          </div>
        </Grid>

      </Grid>
    );
  }
}
