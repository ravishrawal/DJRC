import getDirections from 'react-native-google-maps-directions'
import React, { Component } from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-elements';


export default class gmapsDirections extends Component {
   constructor(props){
     super(props)
     this.handleGetDirections = this.handleGetDirections.bind(this);
   }
   handleGetDirections() {
    const data = {
      destination: this.props.barLocation,
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }
    getDirections(data)
  }
  render() {
    return (
      <View>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}
