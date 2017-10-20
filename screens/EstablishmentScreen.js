import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Expo from 'expo';
const { Constants } = Expo;

export default class EstablishmentScreen extends React.Component {
  render() {
    let name;
    if (this.props.navigation
        && this.props.navigation.state
        && this.props.navigation.state.params) {
      name = this.props.navigation.state.params.place.name;
    }
    return (
      <View style={styles.container}>
        <Text>Does {name} have coat hooks?</Text>
      </View>
    );
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
