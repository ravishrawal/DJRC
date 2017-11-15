import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import SignUpOrIn from './SignUpOrIn';
import Profile from './Profile';
import BarProfile from './BarProfile';

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
  

class Nav extends Component{
  
  render(){
    
    const {user} = this.props;
    // const Tab = user.id ? UserTabs : Tabs;
    const Tab = user.id ? LoggedInNav : LoggedOutNav;
    return (
      <Tab />
    )
  }
}


const mapState = ({ user, navigation}) => {
  return { user, navigation };
}

export default connect(mapState)(Nav)