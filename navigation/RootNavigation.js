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
    // this helps accomplish a transparent navigator although it's not currently supported.
    // https://github.com/react-navigation/react-navigation/issues/2713
    // also had to edit the Card style in src:
    //    https://github.com/react-navigation/react-navigation/issues/3803#issuecomment-375436467
    cardStyle: { backgroundColor: 'transparent' },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
    }),
  }
);

export default class RootNavigation extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
