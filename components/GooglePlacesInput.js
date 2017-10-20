import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Keys from '../Keys';

/* const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }}; */

export default class GooglePlacesInput extends React.Component {
  _onPress = (data, details = null) => { // 'details' is provided when fetchDetails = true
    if (this.props.onSelect) {
      this.props.onSelect({
        name: details.name,
        place_id: data.place_id,
      }, data, details);
    }
  }
  
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={3} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={this._onPress}
      
        getDefaultValue={() => ''}
      
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: Keys.GOOGLE_PLACES_KEY,
          language: 'en', // language of the results
          types: 'establishment' // default: 'geocode'
        }}
      
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
      
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}

        predefinedPlaces={[]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
    );
  }
}
