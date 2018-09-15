import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

export default class ProductImage extends Component {
  render() {
    return (
      <Grid container spacing={40} className={'product-detail-images'}>

        <Grid item xs={3} className={'product-detail-images-thumbnails'}>

          <div className={'product-detail-images-thumbnails_list'}>

            <div className={'product-detail-images-thumbnails_item'}>
              <img
                src={'https://i.pinimg.com/736x/af/1c/30/af1c30d6d881d9447dec06149f61d2f9--drawings-of-girls-anime-drawings-girl.jpg'}
                alt={'Thumbnails'}
                className={'product-detail-images-thumbnails_img product-detail-images-thumbnails_img__selected'}
              />
            </div>

            <div className={'product-detail-images-thumbnails_item'}>
              <img
                src={'https://i.pinimg.com/736x/2b/17/10/2b17103c654c4c709ea10868c7d0ea1a--rap-music-thinking-of-you.jpg'}
                alt={'Thumbnails'}
                className={'product-detail-images-thumbnails_img'}
              />
            </div>

            <div className={'product-detail-images-thumbnails_item'}>
              <img
                src={'https://cs8.pikabu.ru/post_img/big/2017/10/11/6/1507710971147487919.jpg'}
                alt={'Thumbnails'}
                className={'product-detail-images-thumbnails_img'}
              />
            </div>

          </div>

        </Grid>

        <Grid item xs={9} className={'product-detail-images-detail'}>
          <div className={'product-detail-images-detail_wrapper'}>
            <img
              className={'product-detail-images-detail_img'}
              src={'https://i.pinimg.com/736x/af/1c/30/af1c30d6d881d9447dec06149f61d2f9--drawings-of-girls-anime-drawings-girl.jpg'}
              alt={'Detail'}
            />
          </div>
        </Grid>

      </Grid>
    );
  }
}
