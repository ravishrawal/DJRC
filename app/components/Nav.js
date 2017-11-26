import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
// import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../helper/colors.js';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import SignUpOrIn from './SignUpOrIn';
import Profile from './Profile';
import BarProfile from './BarProfile';

const styles = StyleSheet.create({
  // tab: {
  //   borderRightColor: '#fff',
  //   borderRightWidth: 1,
  // },
  indicator: {
    height: 0,
    width: 0,
  },
  label: {
    fontFamily: 'zilla-slab-regular',
    // fontSize: 20,
    // marginBottom: 12,
  },
  icon: {
    backgroundColor: 'green',
    height: 20,
    width: 20,
  },
  tabBar: {
    backgroundColor: colors.offWhite,
    borderTopColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
  },
});

const Tabs = TabNavigator({
  Home: {
    screen: GenreTiles,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-musical-notes' : 'ios-musical-notes-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  Map: {
    screen: GenreMap,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-map' : 'ios-map-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  Login: {
    screen: SignUpOrIn,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.pink,
    inactiveTintColor: colors.gray,
    iconStyle: styles.icon,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    // tabStyle: styles.tab,
    style: styles.tabBar,
  },
  tabBarPosition: 'bottom',
});

const UserTabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  Profile: { screen: Profile }
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.pink,
    inactiveTintColor: colors.gray,
    iconStyle: styles.icon,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    // tabStyle: styles.tab,
    style: styles.tabBar,
  },
  tabBarPosition: 'bottom',
});

const LoggedOutNav = StackNavigator({
  Home: { screen: Tabs },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile }
}, {
  headerMode: 'none'
});

const LoggedInNav = StackNavigator({
  Home: { screen: UserTabs },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile }
}, {
  headerMode: 'none'
});

// let { width, height } = Dimensions.get('window');

class Nav extends Component {

  render() {

    const { user } = this.props;
    // const Tab = user.id ? UserTabs : Tabs;
    const Tab = user.id ? LoggedInNav : LoggedOutNav;
    return (
      <Tab />
    );
  }
}

const mapState = ({ user, navigation}) => {
  return { user, navigation };
};

export default connect(mapState)(Nav);
