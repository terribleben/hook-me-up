import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Expo from 'expo';
import GooglePlacesInput from '../components/GooglePlacesInput';

const { Constants } = Expo;

export default class PickerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesInput
          onSelect={this._onSelectPlace}
          />
      </View>
    );
  }

  _onSelectPlace = (place, moreData, moreDetails) => {
    this.props.navigation.navigate('Establishment', { place, moreData, moreDetails });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
});
