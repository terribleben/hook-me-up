import React from 'react';
import { StackNavigator } from 'react-navigation';

import EstablishmentScreen from '../screens/EstablishmentScreen';
import PickerScreen from '../screens/PickerScreen';

const RootStackNavigator = StackNavigator(
  {
    Picker: {
      screen: PickerScreen,
    },
    Establishment: {
      screen: EstablishmentScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

export default class RootNavigation extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
