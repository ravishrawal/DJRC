import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import {fetchGenres} from '../redux/genres'
import {tokenUser} from '../redux/user'

let { width, height } = Dimensions.get('window')

class GenreTiles extends React.Component {
  componentDidMount(){
    this.props.fetchGenres();
    this.props.fetchUser();

  }
  render() {
    const genres = this.props.genres.length && this.props.genres;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <FlatList
            data={genres}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() =>
                  navigate('Map', { genre: item.key })
                }>
                <View
                  style={styles.row}
                >
                  <Text style={styles.item}>{item.name}</Text>
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
    backgroundColor: 'white',
    marginTop: 50
  },
  center: {
  },
  row: {
    flex: 1,
    width: width,
    backgroundColor: 'orange',
    marginBottom: 10
  },
  item: {
    margin: 30,
    alignSelf: 'center',
    fontSize: 30,
    color: 'white'
  }
});


const mapState = ({ genres }) => {
    return { genres };
};

const mapDispatch = (dispatch) => {
    return {
        fetchGenres: () => {
            dispatch(fetchGenres());
        },
        fetchUser: () => {
          dispatch(tokenUser());
        },
      }
}

export default connect(mapState, mapDispatch)(GenreTiles);