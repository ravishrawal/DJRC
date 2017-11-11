import React, {Component} from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import GenreTiles from './GenreTiles';
import GenreMap from './GenreMap';
import SignUpOrIn from './SignUpOrIn';
import Protected from './Protected';

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
  Protected: { screen: Protected }
}, {
    tabBarPosition: 'bottom'
  }
)

class Nav extends Component{

  render(){
    console.log('user',this.props.user)
    const {user} = this.props;
    const Tab = user.id ? UserTabs : Tabs;
    // console.log('user', this.props)
    return (
      <Tab />
    )
  }
}


const mapState = ({ user, navigation}) => {
  return { user, navigation };
}

export default connect(mapState)(Nav)