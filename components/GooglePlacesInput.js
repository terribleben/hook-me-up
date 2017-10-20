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
        placeholder='Find a Bar...'
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
            width: '100%',
            backgroundColor: 'transparent',
            height: 42,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            borderRadius: 0,
            fontSize: 24,
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: '#000',
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
          poweredContainer: {
            height: 0,
          },
          powered: {
            height: 0,
          },
          container: {
            flex: 1,
          },
        }}
      
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'bar'
        }}

        predefinedPlaces={[]}

        debounce={200}
        />
    );
  }
}
