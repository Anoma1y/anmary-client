import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GOOGLE_MAP_TOKEN = 'AIzaSyADny6Mjy49YDCexGxeRlvNFbi0QdbVqRA';
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

export default class Map extends Component {

  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAP_TOKEN}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}
