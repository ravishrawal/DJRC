import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';

const tabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap }
}, {
    tabBarPosition: 'bottom'
  }
)

export default AppRoot = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap }
}, {
    tabBarPosition: 'bottom'
  }
)

