import React, { Component } from 'react';
import {
  Add as AddIcon
} from '@material-ui/icons';

export default class BlockInfo extends Component {
  render() {
    return (
      <section>
        <div className={'information-blocks'}>
          <div className="information-block new_collections">
            <div className="collection_info">
              <div className="collection_name">
                <h2>Осень/Зима</h2>
                <h2>2017/2018</h2>
                <p>Новое поступление</p>
              </div>
              <a href={''} className={'information-block_link information-block_link__black'}>Смотреть коллекцию</a>
            </div>
            <div className={'information-block_overlay'} />
          </div>
          <div className="information-block season_sale">
            <a href={'#'} className="season_sale_info">
              <p>Сезонная распродажа</p>
              <h1>Sale</h1>
            </a>
          </div>
          <div className={'information-block new_arrivals'}>
            <div className={'information-block_overlay'} />
            <div className={'arrivals_info'}>
              <h1>Последнее поступление</h1>
              <a href={'#'} className={'information-block_link information-block_link__black'}>Смотреть</a>
            </div>
          </div>
          <div className={'information-block subscribe'}>
            <div className={'information-block_overlay'} />
            <div className={'get_subscribe'}>
              <h2>Подписаться на рассылку</h2>
            </div>
            <div className={'formSubscribe'}>
              <input
                type="text" placeholder="Введите E-Mail" id="get_subscribe_email"
                name="get_subscribe_email" />
              <button id="get_subscribe_btn" name="get_subscribe_btn">
                <AddIcon />
              </button>
              <span id="error-subscribe" />
            </div>
          </div>
          <div className="information-block all_catalog">
            <div className={'information-block_overlay'} />
            <div className="catalog_info">
              <h2>Большой выбор женской одежды</h2>
            </div>
            <a href={'#'} className={'information-block_link information-block_link__black'}>Перейти в каталог</a>
          </div>
        </div>
      </section>
    );
  }
}
