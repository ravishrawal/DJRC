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
    fontFamily: fonts.zilla,
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
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name={'music'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
      swipeEnabled: false
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
      swipeEnabled: false
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
      ),
      swipeEnabled: false
    }),
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.pink,
    iconStyle: styles.icon,
    inactiveTintColor: colors.gray,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
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
    iconStyle: styles.icon,
    inactiveTintColor: colors.gray,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    style: styles.tabBar,
  },
  tabBarPosition: 'bottom',
});

const OwnerTabs = TabNavigator({
  MyBar: {screen: BarOwner },
  Map: { screen: GenreMap }
}, {
  tabBarPosition: 'bottom'
  }
)

const LoggedOutNav = StackNavigator({
  Home: { screen: Tabs },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile },
  Review: { screen: Review }
}, {
  headerMode: 'none'
});

const LoggedInNav = StackNavigator({
  Home: { screen: UserTabs },
  Map: { screen: GenreMap },
  SampleProfile: { screen: BarProfile },
  Review: { screen: Review }
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
