import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading, Asset } from 'expo';

import Argyle from './components/Argyle';
import RootNavigation from './navigation/RootNavigation';

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this._loadAppAsync();
  }

  _loadAppAsync = async () => {
    try {
      await Asset.fromModule(require('./assets/argyle.png')).downloadAsync();
    } catch (_) {}
    this.setState({ isLoaded: true });
  }
  
  render() {
    if (!this.state.isLoaded) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Argyle />
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
