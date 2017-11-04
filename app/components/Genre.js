import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
let { width, height } = Dimensions.get('window')

export default class Genre extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.genre,
      });
      
  render() {
    const {genre} = this.props.navigation.state.params;
    console.log(this.props.navigation.state.params);
    return (
      <View style={styles.container}>
        <Text>Hello {genre}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  center: {
    marginTop: height / 8
  },
  item: {
    fontSize: 18,
    height: height / 3,
  },
});
