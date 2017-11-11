import React, {Component} from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import SignUpOrIn from './SignUpOrIn';
import Profile from './Profile';

const Tabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  SignUpOrIn: { screen: SignUpOrIn }
}, {
    tabBarPosition: 'bottom'
  }
)

const UserTabs = TabNavigator({
  Home: { screen: GenreTiles },
  Map: { screen: GenreMap },
  Profile: { screen: Profile }
}, {
    tabBarPosition: 'bottom'
  }
)

class Nav extends Component{

  render(){
    const {user} = this.props;
    const Tab = user.id ? UserTabs : Tabs;
    return (
      <Tab />
    )
  }
}


const mapState = ({ user, navigation}) => {
  return { user, navigation };
}

export default connect(mapState)(Nav)