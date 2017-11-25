import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import SignUpOrIn from './SignUpOrIn';
import Profile from './Profile';
import BarProfile from './BarProfile';

// const initialLayout = {
//   height: 0,
//   width: Dimensions.get('window').width,
// };

const Tabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  SignUpOrIn: { screen: SignUpOrIn }
}, {
  animationEnabled: true,
  // initialLayout: { initialLayout },
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
  tabBarPosition: 'bottom',
});

const UserTabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  Profile: { screen: Profile }
}, {
  tabBarPosition: 'bottom'
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

let { width, height } = Dimensions.get('window');

class Nav extends Component{

  render() {

    const { user } = this.props;
    // const Tab = user.id ? UserTabs : Tabs;
    const Tab = user.id ? LoggedInNav : LoggedOutNav;
    return (
      <View style={styles.container}>
        <Tab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 50,
  },
  buttonStyle: {
    backgroundColor: '#ff4554',
    borderColor: '#00c3e3',
    borderRadius: 2,
    borderWidth: 3,
    height: (height - 150) / 5,
    justifyContent: 'center',
    margin: 5,
    width: (width - 20) / 2,
  },
  genreText: {
    alignSelf: 'center',
    color: '#f7f7f7',
    fontFamily: 'zilla-slab-regular',
    fontSize: 20,
  },
});

const mapState = ({ user, navigation}) => {
  return { user, navigation };
};

export default connect(mapState)(Nav);
