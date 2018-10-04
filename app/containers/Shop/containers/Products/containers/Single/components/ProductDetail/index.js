import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Modal,
  Chip,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import SizeInfo from '../../components/SizeInfo';
import { changeCurrentSize } from '../../store/actions';
import { amountOutput } from 'lib/amount';
import _ from 'lodash';

@connect(({ Shop_Products, Shop_Products_Single }) => ({ Shop_Products, Shop_Products_Single }), ({
  changeCurrentSize
}))
export default class ProductDetail extends Component {

  state = {
    sizeModalOpen: false,
  };

  handleSizeModalOpen = () => {
    this.setState({ sizeModalOpen: true });
  };

  handleSizeModalClose = () => {
    this.setState({ sizeModalOpen: false });
  };

  render() {
    const { compositions, sizes } = this.props.Shop_Products;
    const { product, currentSize } = this.props.Shop_Products_Single;
    const product_sizes = _.sortBy(product.sizes, [(o) => o.size_id]);

    return (
      <Grid container spacing={40} className={'product-detail-content'}>

        <Grid item xs={12}>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-title'}>
              {product.name.length !== 0 && <span className={'product-detail-content_text product-detail-content-title_name'}>{product.name}</span>}
              <span className={'product-detail-content_text product-detail-content-title_article'}>{product.article}</span>
            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-price'}>

              {
                product.discount !== 0 ? (
                  <div className={'product-detail-content-price_sale'}>
                    <span className={'product-detail-content_text product-detail-content-price_old'}>{amountOutput(product.price).value}</span>
                    <span className={'product-detail-content_text product-detail-content-price_new'}>{amountOutput(product.total_price).value}</span>
                  </div>
                ) : (
                  <span className={'product-detail-content-price_current'}>
                    {amountOutput(product.total_price).value}
                  </span>
                )
              }

            </div>
          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-available'}>
              {
                product.is_available ? (
                  <span className={'product-detail-content-available_text'}>
                    В наличии
                  </span>
                ) : (
                  <span className={'product-detail-content-available_text product-detail-content-available_text__not-available'}>
                    Нет в наличии
                  </span>
                )
              }

            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Категория
              </div>

              <div className={'product-detail-content-info_text'}>
                {product.category.name}
              </div>

            </div>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Бренд
              </div>

              <div className={'product-detail-content-info_text'}>
                {product.brand.name}
              </div>

            </div>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Сезон
              </div>

              <div className={'product-detail-content-info_text'}>
                {product.season.name}
              </div>

            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-size'}>

              <div className={'product-detail-content-size-headline'}>
                <div className={'product-detail-content-size-headline_info'}>
                  <span className={'product-detail-content-size-headline_text'}>Размер:</span>
                  <span className={'product-detail-content-size-headline_current'}>
                    {
                      currentSize && `${currentSize.ru} (${currentSize.international})`
                    }
                  </span>
                </div>
                <div className={'product-detail-content-size-headline_btn'}>
                  <span
                    className={'product-detail-content-size-headline_btn-text'}
                    onClick={this.handleSizeModalOpen}
                  >
                    Таблица размеров
                  </span>
                  <Modal
                    open={this.state.sizeModalOpen}
                    onClose={this.handleSizeModalClose}
                    className={'product-detail-content-size-modal'}
                  >
                    <div className={'product-detail-content-size-modal_wrap'}>

                      <SizeInfo />

                    </div>
                  </Modal>
                </div>
              </div>

              <div className={'product-detail-content-size_list'}>
                {
                  product_sizes.map((size) => {
                    const findSize = _.find(sizes, { id: size.size_id });

                    return (
                      <Chip
                        className={`product-detail-content-size_item${currentSize && (currentSize.id === findSize.id) ? ' product-detail-content-size_item__selected' : ''}`}
                        key={findSize.id}
                        onClick={() => this.props.changeCurrentSize(findSize)}
                        label={`${findSize.ru} (${findSize.international})`}
                      />
                    );
                  })
                }
              </div>

            </div>

          </div>

          {
            product.description.length !== 0 && (
              <div className={'product-detail-content_item'}>

                <ExpansionPanel className={'product-detail-content_expansion'}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-detail-content-item_head'}>
                    <span className={'product-detail-content_expansion-title'}>Описание</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={'product-detail-content-item_content'}>
                    {product.description}
                  </ExpansionPanelDetails>
                </ExpansionPanel>

              </div>
            )
          }

          <div className={'product-detail-content_item'}>

            <ExpansionPanel className={'product-detail-content_expansion'}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-detail-content-item_head'}>
                <span className={'product-detail-content_expansion-title'}>Состав</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={'product-detail-content-item_content'}>
                <div className={'product-detail-content-composition_list'}>
                  {
                    product.compositions.map((composition) => {
                      return (
                        <span
                          key={composition.id}
                          className={'product-detail-content-composition_item'}
                        >
                          {_.find(compositions, { id: composition.composition_id }).name} - {composition.value}%
                        </span>
                      );
                    })
                  }
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>

        </Grid>

      </Grid>
    );
  }
}
