import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Notifications as NotificationsIcon
} from '@material-ui/icons';

export default class BlockInfo extends Component {
  render() {
    return (
      <section>
        <div className={'information-blocks'}>
          <div className={'information-block new_collections'}>
            <Link to={'/product?last_season=1'} className={'new_collections_image'}>
              <div className={'collection_info'}>
                <div className={'collection_name'}>
                  <h2>Осень/Зима</h2>
                  <h2>2017/2018</h2>
                  <p>Новое поступление</p>
                </div>
              </div>
              <div className={'information-block_overlay'} />
            </Link>
          </div>
          <div className={'information-block season_sale'}>
            <Link to={'/product?has_discount=1'} className={'season_sale_info'}>
              <p>Сезонная распродажа</p>
              <h1>Sale</h1>
            </Link>
          </div>
          <div className={'information-block new_arrivals'}>

            <Link to={'/product'} className={'new_arrivals_image'}>
              <div className={'arrivals_info'}>
                <div className={'collection_name'}>
                  <h1>Последнее поступление</h1>
                </div>
              </div>
              <div className={'information-block_overlay'} />
            </Link>
          </div>
          <div className={'information-block subscribe'}>
            <div className={'information-block_overlay'} />

            <form action={'#'} className={'subscribe-form'}>
              <div className={'subscribe-form_input'}>
                <input
                  type={'text'}
                  placeholder={'E-Mail или телефон'}
                />
                <span className={'subscribe-form_error'}> </span>
              </div>
              <div className={'subscribe-form_btn'}>
                <button>
                  Подписаться
                  <NotificationsIcon />
                </button>
              </div>
            </form>

          </div>
          <div className={'information-block all_catalog'}>
            <Link to={'/product'} className={'all_catalog_image'}>
              <div className={'catalog_info'}>
                <h2>Большой выбор женской одежды</h2>
              </div>
              <div className={'information-block_overlay'} />
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
