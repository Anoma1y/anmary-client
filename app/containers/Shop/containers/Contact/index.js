import React, { Component } from 'react';
import './style.scss';
import {
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import {
  Call as CallIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Drafts as DraftsIcon
} from '@material-ui/icons';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const mapOptions = {
  styles: [{
    'featureType': 'administrative.country',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'simplified'
      },
      {
        'hue': '#ff0000'
      }
    ]
  }
  ]
};

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 59.9858667, lng: 30.3003000 }}
      options={mapOptions}
    >
    {props.isMarkerShown && <Marker position={{ lat: 59.9858667, lng: 30.3003000 }} />}
  </GoogleMap>
)));

export default class Contact extends Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  }

  render() {
    return (
      <section className={'contact'}>
        <Grid item xs={12} className={'container'}>
          <div className={'section-title-container'}>
            <div className={'section_subtitle'}>только лучшее</div>
            <div className={'section_title'}>контакты</div>
          </div>
        </Grid>

        <Grid item xs={12} className={'container'}>

          <Grid container>

            <Grid item xs={12} md={6}>
              <div className={'contact_column contact_column__line'}>
                <form className={'contact-form'}>
                  <h4 className={'contact-form_header'}>
                    Обратная связь
                  </h4>

                  <div className={'contact-form_input'}>
                    <TextField
                      fullWidth
                      label={'Почта'}
                      placeholder={'mail@example.com'}
                    />

                  </div>

                  <div className={'contact-form_input'}>
                    <TextField
                      fullWidth
                      label={'Вопрос'}
                      placeholder={'Вопрос?'}
                      multiline
                      rows={5}
                    />
                  </div>

                  <div className={'contact-form_btn'}>
                    <Button
                      fullWidth
                      color={'primary'}
                      variant={'raised'}
                    >
                      Отправить
                    </Button>
                  </div>

                </form>
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
                      <span className={'contact-info_text'}>696969, Санкт-Петербург, м. Черная Речка, улица Пушкина, дом Колотушкина</span>
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
                      <span className={'contact-info_text contact-info_text__selected'}>8 800 555 35 35</span>
                    </div>
                  </div>

                  <div className={'contact-info_item'}>

                    <div className={'contact-info_head'}>
                      <DraftsIcon />
                      <h4 className={'contact-info_header'}>Почта</h4>
                    </div>

                    <div className={'contact-info_content'}>
                      <span className={'contact-info_text contact-info_text__selected'}>example@mail.ru</span>
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
              <MyMapComponent
                isMarkerShown
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyADny6Mjy49YDCexGxeRlvNFbi0QdbVqRA'}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            </div>

          </Grid>
        </Grid>
      </section>
    );
  }
}
