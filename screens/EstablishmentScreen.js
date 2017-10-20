import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Api from '../api/Api';
import Expo from 'expo';
const { Constants } = Expo;

export default class EstablishmentScreen extends React.Component {
  state = {
    isLoading: true,
    fetchedEstablishment: null,
  };

  componentDidMount() {
    this._reloadDataAsync();
  }

  componentWillReceiveProps(nextProps) {
    const { nextPlaceId } = this._getPlaceProps(nextProps);
    const { placeId } = this._getPlaceProps(this.props);
    if (nextPlaceId !== placeId) {
      this._reloadDataAsync();
    }
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View />
      );
    }
    const { name } = this._getPlaceProps(this.props);
    const { fetchedEstablishment } = this.state;
    let content;

    if (fetchedEstablishment) {
      content = this._renderExistingEstablishment(fetchedEstablishment);
    } else {
      content = this._renderUnknownEstablishment();
    }
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Does {name} have coat hooks?</Text>
        {content}
      </View>
    );
  }

  _renderExistingEstablishment = (establishment) => {
    let text = (establishment.has_hooks) ? "yep" : "nope";
    return (
      <Text style={styles.answer}>{text}</Text>
    );
  }

  _renderUnknownEstablishment = () => {
    return (
      <View>
        <Text style={styles.answer}>NOBODY KNOWS</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._onPressHooksAsync(true)}>
          <Text>I am here and it does indeed have coat hooks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._onPressHooksAsync(false)}>
          <Text>I am here and cannot find any damn coat hooks</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPressHooksAsync = async (hasHooks) => {
    const { name, placeId } = this._getPlaceProps(this.props);
    console.log('press', name, placeId);
    await Api.addEstablishmentAsync({
      name,
      place_id: placeId,
      has_hooks: hasHooks,
    });
    this._reloadDataAsync();
  }

  _getPlaceProps = (props) => {
    let name, placeId;
    if (this.props.navigation
        && this.props.navigation.state
        && this.props.navigation.state.params) {
      name = this.props.navigation.state.params.place.name;
      placeId = this.props.navigation.state.params.place.place_id;
    }
    return { name, placeId };
  }

  _reloadDataAsync = async () => {
    await this.setState({ isLoading: true });
    const { placeId } = this._getPlaceProps(this.props);
    let fetchedEstablishment;
    try {
      const response = await Api.getEstablishmentAsync(placeId);
      if (response && response.status === 'success') {
        fetchedEstablishment = response.data.bar;
      }
    } catch (_) {
      fetchedEstablishment = null;
    }
    await this.setState({ isLoading: false, fetchedEstablishment });
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
  question: {
    fontSize: 24,
    marginVertical: 16,
  },
  answer: {
    fontSize: 48,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 12,
    marginVertical: 4,
    alignItems: 'center',
    borderRadius: 6,
  },
});
