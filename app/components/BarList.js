import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import { List, ListItem, Separator } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import getDirections from 'react-native-google-maps-directions';
const Icons = require('./Icons');


export default function BarList(props){

  function renderRow(bar){
    let swipeoutBtns = [
      {
        text: 'Go',
        backgroundColor: '#ff6763',
        onPress: ()=>{
          const data = {
            destination: { latitude: bar.lat, longitude: bar.lon },
            params: [
              {
                key: "dirflg",
                value: "w"
              }
            ]
          }
          getDirections(data);
        }
      }
    ]
    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose={true}
        >
        <TouchableHighlight
          onPress={ ()=>navigate('SampleProfile', { bar }) } >
          <View>
            <View>
              <Text> {bar.name} </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  const { bars, navigate } = props;
  return (
    <View>
      <List>
        {
          bars.map(bar => {
            return (
              <View key={bar.id}>
                {renderRow(bar)}
              </View>
            )
          })
        }
      </List>
    </View>
  )
}
