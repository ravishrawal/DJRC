//approot

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import BarProfile from './BarProfile';
import SignUpOrIn from './SignUpOrIn';
import Protected from './Protected';
import Nav from './Nav'



const AppRoot = StackNavigator({
  Home: { screen: Nav },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile }
}, {
    headerMode: 'none'
  });

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

export default ReduxApp;