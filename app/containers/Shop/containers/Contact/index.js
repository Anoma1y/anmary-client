import React, { Component } from 'react';
import './style.scss';
import {
  Grid,
} from '@material-ui/core';
import GoogleMap from './components/Map';
import Feedback from './components/Feedback';
import {
  Call as CallIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Drafts as DraftsIcon
} from '@material-ui/icons';

export default class Contact extends Component {
  render() {
    return (
      <section className={'contact'}>

        <Grid item xs={12} className={'container'}>

          <Grid container>

            <Grid item xs={12} md={6}>
              <div className={'contact_column contact_column__line'}>
                <Feedback />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>

              <div className={'contact_column'}>

                <div className={'contact-info'}>
                  <div className={'contact-info_item'}>

                    <div className={'contact-info_head'}>
                      <LocationOnIcon />
                      <h4 className={'contact-info_header'}>Адрес</h4>
                    </div>

                    <div className={'contact-info_content'}>
                      <span className={'contact-info_text'}>197183, Санкт-Петербург, м. Черная Речка, улица Академика Крылока, дом 4</span>
                    </div>
                  </div>

                  <div className={'contact-info_item'}>

                    <div className={'contact-info_head'}>
                      <AccessTimeIcon />
                      <h4 className={'contact-info_header'}>График работы</h4>
                    </div>

                    <div className={'contact-info_content'}>
                      <span className={'contact-info_text'}>С 11:00 до 20:00</span>
                    </div>
                  </div>

                  <div className={'contact-info_item'}>

                    <div className={'contact-info_head'}>
                      <CallIcon />
                      <h4 className={'contact-info_header'}>Телефон</h4>
                    </div>

                    <div className={'contact-info_content'}>
                      <span className={'contact-info_text contact-info_text__selected'}>+7-(904)-619-10-24</span>
                    </div>
                  </div>

                  <div className={'contact-info_item'}>

                    <div className={'contact-info_head'}>
                      <DraftsIcon />
                      <h4 className={'contact-info_header'}>Почта</h4>
                    </div>

                    <div className={'contact-info_content'}>
                      <span className={'contact-info_text contact-info_text__selected'}>nt-nt@mail.ru</span>
                    </div>
                  </div>

                </div>

              </div>

            </Grid>

          </Grid>

        </Grid>

        <Grid container>
          <Grid item xs={12}>

            <div id={'google-map'}>
              <GoogleMap />
            </div>

          </Grid>
        </Grid>
      </section>
    );
  }
}
