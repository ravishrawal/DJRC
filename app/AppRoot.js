import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GenreTiles from './components/GenreTiles';

export default class AppRoot extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GenreTiles />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
