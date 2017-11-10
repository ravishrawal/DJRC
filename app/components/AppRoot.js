//approot

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import BarProfile from './BarProfile';
import SignUp from './SignUp';
import Login from './Login';
import Protected from './Protected';



const Tabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  Protected: { screen: Protected },
  Login: { screen: Login },
  SignUp: { screen: SignUp },
}, {
    tabBarPosition: 'bottom'
  }
)

const AppRoot = StackNavigator({
  Home: { screen: Tabs },
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