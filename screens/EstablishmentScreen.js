import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Api from '../api/Api';
import Expo from 'expo';
const { Constants } = Expo;
import { Ionicons } from '@expo/vector-icons';

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
      return this._renderLoading();
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.question}>Does {name} have coat hooks?</Text>
        {content}
        {this._renderGoBack()}
      </ScrollView>
    );
  }

  _renderLoading = () => {
    return (
      <View style={styles.container}>
        <View style={styles.loadingPlaceholder}>
          <ActivityIndicator />
        </View>
        {this._renderGoBack()}
      </View>
    );
  };

  _renderExistingEstablishment = (establishment) => {
    let answer, answerStyle, buttonText;
    if (establishment.has_hooks) {
      answer = 'yep';
      answerStyle = styles.answerYesContainer;
      buttonText = 'I disagree, I see no hooks anywhere';
    } else {
      answer = 'nope';
      answerStyle = styles.answerNoContainer;
      buttonText = 'Actually I found some';
    }
    return (
      <View>
        <View style={[styles.answerContainer, answerStyle]}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._onPressHooksAsync(!establishment.has_hooks)}>
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderUnknownEstablishment = () => {
    return (
      <View>
        <View style={[styles.answerContainer, styles.answerUnknownContainer]}>
          <Text style={styles.answerText}>it's a mystery</Text>
        </View>
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

  _renderGoBack = () => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="ios-arrow-back" size={30} color="#aaa" style={{ alignSelf: 'flex-start' }} />
          <Text style={{paddingLeft: 10, paddingTop: 6, color:'#666' }}>Go back</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onPressHooksAsync = async (hasHooks) => {
    const { name, placeId } = this._getPlaceProps(this.props);
    const { fetchedEstablishment } = this.state;
    if (fetchedEstablishment) {
      await Api.updateEstablishmentAsync(fetchedEstablishment.id, hasHooks);
    } else {
      await Api.addEstablishmentAsync({
        name,
        place_id: placeId,
        has_hooks: hasHooks,
      });
    }
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
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: Constants.statusBarHeight + 8,
  },
  loadingPlaceholder: {
    marginVertical: 8,
    paddingVertical: 72,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 12,
  },
  question: {
    fontSize: 14,
  },
  answerContainer: {
    marginVertical: 8,
    paddingVertical: 48,
    borderRadius: 6,
  },
  answerText: {
    fontSize: 48,
    textAlign: 'center',
  },
  answerYesContainer: {
    backgroundColor: '#0f0',
  },
  answerNoContainer: {
    backgroundColor: '#f00',
  },
  answerUnknownContainer: {
    backgroundColor: '#ddf',
  },
  button: {
    padding: 12,
    marginTop: 4,
    marginBottom: 12,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#eee',
  },
});
