import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import { List, ListItem, Separator } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
const Icons = require('./Icons');

var swipeoutBtns = [
  {
    text: 'More',
    backgroundColor: '#ff6763',
    onPress: ()=>{}
  }
]

export default function BarList(props){
  const { bars } = props;
  const { navigate } = props.navigation;
  return (
    <View>
      <List>
        {
          bars.map(bar => {
            return (
              <Swipeout
                right={swipeoutBtns}
                autoClose='true'
                >
                <TouchableHighlight
                  onPress={ ()=>navigate('SampleProfile', { bar: marker }) } >
                  <View>
                    <View>
                      <Text> {bar.name} </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Swipeout>
            )
          })
        }
      </List>
    </View>
  )
}
