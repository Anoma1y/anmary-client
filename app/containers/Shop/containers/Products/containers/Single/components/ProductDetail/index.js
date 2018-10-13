import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogActions,
  DialogTitle,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Modal,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  Done as DoneIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import SizeInfo from '../../components/SizeInfo';
import { changeCurrentSize } from '../../store/actions';
import { changeCountItems } from 'containers/Shop/containers/Header/store/actions';
import { amountOutput } from 'lib/amount';
import Storage from 'lib/storage';
import _ from 'lodash';

@connect(({ Shop_Products, Shop_Header, Shop_Products_Single }) => ({ Shop_Products, Shop_Header, Shop_Products_Single }), ({
  changeCurrentSize,
  changeCountItems
}))
export default class ProductDetail extends Component {

  state = {
    sizeModalOpen: false,
    dialogOpen: false,
    addType: 'cart',
    addToError: null
  };

  handleSizeModalOpen = () => this.setState({ sizeModalOpen: true });

  handleSizeModalClose = () => this.setState({ sizeModalOpen: false });

  handleDialogClose = () => this.setState({ dialogOpen: false });

  handleDialogOpen = () => this.setState({ dialogOpen: true });

  handleAddTo = (type) => {
    const { product, currentSize } = this.props.Shop_Products_Single;

    if (!currentSize) {
      this.setState({ addToError: 'Выберите размер!' });
      this.handleDialogOpen();
      return;
    }

    const addToType = Storage.get(type) || [];

    if (addToType) {
      const isProductInCart = _.find(addToType, { size: { id: parseInt(currentSize) } }) && _.find(addToType, { product: { id: parseInt(product.id) } });

      if (isProductInCart) {
        this.setState({ addToError: `Выбранный размер уже есть в ${type === 'cart' ? 'корзине' : 'избранном'}!` });
        this.handleDialogOpen();
        return;
      }
    }

    const { sizes } = this.props.Shop_Products;
    const productCart = {
      product: {
        id: product.id,
        name: product.name,
        article: product.article,
        category: product.category.name,
        brand: product.brand.name,
        is_available: product.is_available,
        price: product.price,
        discount: product.discount,
        total_price: product.total_price,
        image: _.find(product.images, { is_default: true }) || product.images[0]
      },
      size: _.find(sizes, { id: parseInt(currentSize) })
    };

    this.handleDialogOpen();
    this.setState({
      addType: type,
      addToError: null
    });

    const { count_items } = this.props.Shop_Header;
    const type_count_items = count_items[type] + 1;

    this.props.changeCountItems(type, type_count_items);
    Storage.set(type, [...addToType, productCart]);
  };

  render() {
    const { addToError, addType } = this.state;
    const { compositions, sizes } = this.props.Shop_Products;
    const { product, currentSize } = this.props.Shop_Products_Single;
    const product_sizes = _.sortBy(product.sizes, [(o) => o.size_id]);

    return (
      <Grid container spacing={40} className={'product-detail-content'}>

        <Grid item xs={12}>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-title'}>
              <span className={'product-detail-content_text product-detail-content-title_name'}>{product.name.length !== 0 ? product.name : product.category.name}</span>
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

            <div className={'product-detail-content-selects'}>

              <div className={'product-detail-content-selects_title'}>
                Размер
              </div>

              <div className={'product-detail-content-selects_content'}>
                <Select
                  fullWidth
                  onChange={(e) => this.props.changeCurrentSize(e.target.value)}
                  displayEmpty
                  value={currentSize}
                  className={'product-detail-content-selects_select'}
                >
                  <MenuItem value={''} disabled>Выберите размер</MenuItem>
                  {
                    product_sizes.map((size) => {
                      const findSize = _.find(sizes, { id: size.size_id });

                      return (
                        <MenuItem key={findSize.id} value={findSize.id}>
                          {`${findSize.ru} (${findSize.international})`}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </div>

            </div>

          </div>

          {
            product.description.length !== 0 && (
              <div className={'product-detail-content_item product-detail-content_additional-info'}>

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

          <div className={'product-detail-content_item product-detail-content_additional-info'}>

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

          <div className={'product-detail-content_item'}>
            <Grid container spacing={40} justify={'space-around'}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <button
                  className={'product-detail-content_btn product-detail-content_btn__add-to-cart'}
                  onClick={() => this.handleAddTo('cart')}
                >
                  Добавить в корзину
                </button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <button
                  className={'product-detail-content_btn product-detail-content_btn__add-to_favorite'}
                  onClick={() => this.handleAddTo('favorite')}
                >
                  Отложить
                </button>
              </Grid>
            </Grid>

            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleDialogClose}
              className={'product-detail-content-dialog'}
            >
              <DialogTitle className={'product-detail-content-dialog_title'}>
                <div className={`product-detail-content-dialog_icon${addToError ? ' product-detail-content-dialog_icon__warning' : ''}`}>
                  { !addToError ? <DoneIcon /> : <CloseIcon /> }
                </div>
              </DialogTitle>
              <DialogContent className={'product-detail-content-dialog_content'}>

                <DialogContentText className={'product-detail-content-dialog_text product-detail-content-dialog_text__strong'}>
                  {
                    !addToError && (
                      product.name.length !== 0 ? `Товар ${product.name} ${product.article}` : `Товар ${product.category.name} ${product.article}`
                    )
                  }
                </DialogContentText>

                <DialogContentText className={`product-detail-content-dialog_text${addToError ? ' product-detail-content-dialog_text__strong' : ''}`}>
                  {
                    !addToError ? `был добавлен в ${addType === 'cart' ? 'корзину' : 'избранное'}!` : addToError
                  }
                </DialogContentText>
              </DialogContent>
              <DialogActions className={'product-detail-content-dialog_action'}>
                <Button
                  onClick={this.handleDialogClose}
                  color={'primary'}
                  variant={'raised'}
                  autoFocus
                >
                  ОК
                </Button>
              </DialogActions>
            </Dialog>

          </div>

        </Grid>

      </Grid>
    );
  }
}
