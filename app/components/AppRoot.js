//approot

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import BarProfile from './BarProfile';
import GetDirections from './GetDirections'
import SignUpOrIn from './SignUpOrIn';
import Profile from './Profile';
import Nav from './Nav'

const AppRoot = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

export default AppRoot;
