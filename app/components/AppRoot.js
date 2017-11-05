import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import BarProfile from './BarProfile';

export default AppRoot = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile },
}, {
    tabBarPosition: 'bottom'
  }
)
