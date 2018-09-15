import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Button,
  Select,
  Modal,

  MenuItem,
  Chip, List, ListItem, ListItemText,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

@connect(({ Shop_Products }) => ({ Shop_Products }))
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
    return (
      <Grid container spacing={40} className={'product-detail-content'}>

        <Grid item xs={12}>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-title'}>
              <span className={'product-detail-content_text product-detail-content-title_name'}>Трусики</span>
              <span className={'product-detail-content_text product-detail-content-title_article'}>D47-557</span>
            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-price'}>

              <div className={'product-detail-content-price_sale'}>
                <span className={'product-detail-content_text product-detail-content-price_old'}>8000</span>
                <span className={'product-detail-content_text product-detail-content-price_new'}>7000</span>
              </div>

              {/* <span className={'product-detail-content-price_current'}> */}
              {/* 8000 */}
              {/* </span> */}

            </div>
          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-available'}>
              <span className={'product-detail-content-available_text product-detail-content-available_text__not-available'}>
                Нет в наличии
              </span>
            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Категория
              </div>

              <div className={'product-detail-content-info_text'}>
                Панцу
              </div>

            </div>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Бренд
              </div>

              <div className={'product-detail-content-info_text'}>
                Хохлы
              </div>

            </div>

            <div className={'product-detail-content-info'}>

              <div className={'product-detail-content-info_title'}>
                Сезон
              </div>

              <div className={'product-detail-content-info_text'}>
                Трое в лодке, не считая хохла
              </div>

            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <div className={'product-detail-content-size'}>

              <div className={'product-detail-content-size-headline'}>
                <div className={'product-detail-content-size-headline_info'}>
                  <span className={'product-detail-content-size-headline_text'}>Размер:</span>
                  <span className={'product-detail-content-size-headline_current'}>60 (4XL)</span>
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
                      Тут размеры будут
                    </div>
                  </Modal>
                </div>
              </div>

              <div className={'product-detail-content-size_list'}>

                {
                  this.props.Shop_Products.sizes.map((size) =>
                    (<Chip
                      className={'product-detail-content-size_item'}
                      key={size.id}
                      label={`${size.ru} (${size.international})`}
                    />))
                }

              </div>

            </div>

          </div>

          <div className={'product-detail-content_item'}>

            <ExpansionPanel className={'product-detail-content_expansion'}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-detail-content-item_head'}>
                <span className={'product-detail-content-headline'}>Описание</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={'product-detail-content-item_content'}>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda atque, autem commodi cupiditate dolorem doloremque doloribus dolorum eaque et fuga illo in incidunt laboriosam natus nemo, nulla numquam officia officiis perspiciatis placeat quidem quis quod reiciendis reprehenderit repudiandae soluta sunt, tempore unde veniam! Corporis culpa eum ipsum similique sit.

              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>

          <div className={'product-detail-content_item'}>

            <ExpansionPanel className={'product-detail-content_expansion'}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={'product-detail-content-item_head'}>
                <span className={'product-detail-content-headline'}>Состав</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={'product-detail-content-item_content'}>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda atque, autem commodi cupiditate dolorem doloremque doloribus dolorum eaque et fuga illo in incidunt laboriosam natus nemo, nulla numquam officia officiis perspiciatis placeat quidem quis quod reiciendis reprehenderit repudiandae soluta sunt, tempore unde veniam! Corporis culpa eum ipsum similique sit.

              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>

          <div className={'product-detail-content_item'}>



          </div>

        </Grid>

      </Grid>
    );
  }
}
