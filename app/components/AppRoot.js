import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import GenreTiles from './GenreTiles';
import Genre from './Genre';

export default AppRoot = StackNavigator({
  Home: { screen: GenreTiles },
  Genre: {screen: Genre}
})


