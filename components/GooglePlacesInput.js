import React from 'react';
import { Text, View, Image } from 'react-native';
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

  _renderRow = (row) => {
    let name, description;
    if (row.structured_formatting) {
      let { main_text, secondary_text } = row.structured_formatting;
      name = main_text;
      description = secondary_text;
    } else {
      name = row.description;
    }
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
          {name}
        </Text>
        <Text style={{ fontSize: 11, color: '#333', marginTop: 4 }}>
          {description}
        </Text>
      </View>
    );
  }

  _renderDescription = (row) => {
    if (row.structured_formatting) {
      return row.structured_formatting.main_text;
    }
    return row.description;
  }
  
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Find a bar...'
        minLength={3} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderRow={this._renderRow}
        renderDescription={this._renderDescription} // used as selected text in TextInput
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
            backgroundColor: '#e9e9e9',
            height: 42,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginHorizontal: 8,
            marginTop: 4,
            borderRadius: 3,
          },
          textInput: {
            borderRadius: 0,
            fontSize: 18,
            backgroundColor: 'transparent',
          },
          listView: {
            marginTop: 12,
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
          row: {
            backgroundColor: '#fff',
            height: 58,
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
