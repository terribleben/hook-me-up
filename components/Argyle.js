import React from 'react';
import { Image } from 'react-native';

export default class Argyle extends React.Component {
  render () {
    return (
        <Image
          source={require('../assets/argyle.png')}
          style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
          resizeMode="cover"
          />
    );
  }
};
