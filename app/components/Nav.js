import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import SignUpOrIn from './SignUpOrIn';
import Profile from './Profile';
import BarProfile from './BarProfile';
import BarOwner from './BarOwner';
import Review from './Review';
import ClaimBar from './ClaimBar';

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'green',
    height: 20,
    width: 20,
  },
  indicator: {
    height: 0,
    width: 0,
  },
  label: {
    fontFamily: fonts.regular,
  },
  tabBar: {
    backgroundColor: colors.offWhite,
    borderTopColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.75,
  },
});

const Tabs = TabNavigator({
  Home: {
    screen: GenreTiles,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'home'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }),
  },
  Map: {
    screen: GenreMap,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'map'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }),
  },
  Login: {
    screen: SignUpOrIn,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'gear'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }),
  }
}, {
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.redOrange,
    inactiveTintColor: colors.gray,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    showIcon: true,
    showLabel: false,
    style: styles.tabBar,
  },
  tabBarPosition: 'bottom',
});

const UserTabs = TabNavigator({
  Home: {
    screen: GenreTiles,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'home'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  Map: {
    screen: GenreMap,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'map'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  Logout: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'gear'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.redOrange,
    inactiveTintColor: colors.gray,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    showIcon: true,
    showLabel: false,
    style: styles.tabBar,
  },
  tabBarPosition: 'bottom',
});

const OwnerTabs = TabNavigator({
  MyBar: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'gear'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
}, {
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: colors.redOrange,
    inactiveTintColor: colors.gray,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    showIcon: true,
    showLabel: false,
    style: styles.tabBar,
  },
  tabBarPosition: 'bottom'
});

const LoggedOutNav = StackNavigator({
  Home: { screen: Tabs },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile },
  ClaimBar: {screen: ClaimBar},
  Review: { screen: Review }
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

const LoggedInOwner = StackNavigator({
  MyBar: { screen: OwnerTabs },
  Map: { screen: GenreMap }
}, {
    headerMode: 'none'
});

class Nav extends Component {

  render() {

    const {user} = this.props;
    const Tab = user.id ? (user.isBusiness ? LoggedInOwner : LoggedInNav) : LoggedOutNav;

    return (
      <Tab />
    );
  }
}

const mapState = ({ user, navigation }) => {
  return { user, navigation };
};

export default connect(mapState)(Nav);
