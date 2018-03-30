import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';

import Expo from 'expo';
import GooglePlacesInput from '../components/GooglePlacesInput';

const { Constants } = Expo;

export default class PickerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="dark-content" />
        <View style={styles.content}>
          <Text style={styles.instructions}>
            Are you going to be able to put your coat anywhere tonight? Use the search box to find out.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <GooglePlacesInput
            onSelect={this._onSelectPlace}
            />
        </View>
      </View>
    );
  }

  _onSelectPlace = (place, moreData, moreDetails) => {
    this.props.navigation.navigate('Establishment', { place, moreData, moreDetails });
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    marginTop: Constants.statusBarHeight + 8,
  },
  content: {
    marginTop: 72 + Constants.statusBarHeight,
    paddingHorizontal: 12,
  },
  instructions: {
    fontSize: 16,
  },
});
