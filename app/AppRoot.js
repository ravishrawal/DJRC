import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button } from 'react-native';
let { width, height } = Dimensions.get('window')

export default class App extends React.Component {
  render() {
    const genres = [
      { key: 'Rock' },
      { key: 'Rap' },
      { key: 'Pop' }
    ];
    return (
      <View style={styles.container}>
        <FlatList
          data={genres}
          renderItem={({ item }) => <Button title={item.key} style={styles.item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height / 3
  },
  item: {
    fontSize: 18,
    height: height / 3
  },
});
