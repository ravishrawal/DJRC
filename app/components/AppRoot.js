import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import BarProfile from './BarProfile';
import GetDirections from './GetDirections'

const AppRoot = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile },
}, {
    tabBarPosition: 'bottom'
  }
)

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

export default ReduxApp;
