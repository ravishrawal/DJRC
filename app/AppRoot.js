import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
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
        <View style={styles.center}>
          <FlatList
            data={genres}
            renderItem={({ item }) =>
              <TouchableOpacity>
                <View style={[{ width: width, height: height / 9, backgroundColor: 'orange', margin: 10 }]}>
                  <Text style={{ margin: 30, alignSelf: 'center', fontSize: 30 }}>{item.key}</Text>
                </View>

              </TouchableOpacity>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  center: {
    marginTop: height / 3
  },
  item: {
    fontSize: 18,
    height: height / 3,
  },
});
