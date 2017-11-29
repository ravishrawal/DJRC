import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Dimensions, Picker, FlatList, TouchableHighlight } from 'react-native';
import { Card, ListItem, List, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/user'
import { updateGenres } from '../redux/bars'
import { fetchGenres } from '../redux/genres';

// import { fetchOneBar } from '../redux/bars'
let { width, height } = Dimensions.get('window');

class BarOwner extends Component {
  constructor(){
    super()
    this.state = {
      formVisible: false,
      genreArr: [1]

    }
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.updateGenre = this.updateGenre.bind(this);
    this.submitGenreUpdate = this.submitGenreUpdate.bind(this);
  }

  componentDidMount(){
    this.props.fetchGenres();
  }

  logout() {
    const { navigate } = this.props.navigation;
    this.props.logoutUser(navigate);
  }

  updateGenre(genre) {
    let newGenres = [this.state.genreArr[0]]
    newGenres[0] = genre;
    this.setState({
      genreArr: newGenres
    })
  }


  submitGenreUpdate(){
    this.props.updateGenres(this.props.owner.id, this.state.genreArr)
  }



    // onSubmitHandler(ev){
    //   ev.preventDefault();
    //   this.setState({
    //     formVisible: !this.state.formVisible
    //   })
    // }
  render() {
    // console.log(this.state, "state")
    // console.log(this.props, "props")
    // console.log(venue)

    const { updateGenre, submitGenreUpdate } = this;

    const genres = this.state.genreArr

    const allGenres = this.props.genres.length && this.props.genres;

    const promos = [
    {name: 'Buy 1 get 1 free'},
    {name: '3 Beers and wings to make you feel awful'}
    ]

    return (
      <View style={styles.container}>
        <Card title = { this.props.owner.name } >
          <Text stlye={{ marginBottom: 10}}>
            This is info about your bar. Maybe Stats?
          </Text>
      {/*    <List containerStyle = {{ marginBottom: 20 }}>
            {
              genres.map((genre)=> (
                <ListItem
                  roundAvatar
                  key={ genre.id }
                  title={ genre.name }
                  >
                  <Picker>
                    {allGenres.map((gen)=> (
                      <Picker.Item label={gen.name} value={gen.name} key={gen.id} />
                      ))}
                  </Picker>
                </ListItem>
              ))
            }

            </List>
            */}
            <Text stlye={{ marginBottom: 10}}>
              Update Your Genre
            </Text>
            <Picker
            selectedValue={genres[0]}
            onValueChange={ updateGenre }>
              {allGenres.map((gen)=> (
                <Picker.Item label={gen.name} value={gen.key} key={gen.key} />
                ))}
            </Picker>

            <Button
              onPress = { submitGenreUpdate }
              title= 'Submit Genre Changes'
            />


            <Button
              onPress={() => alert('Add Promo!')}
              title='Add Promo!'
            />

            <Text stlye={{ marginBottom: 10}}>
              Current Promos
            </Text>
            <FlatList
              data={promos}
              keyExtractor={item => item.name}
              renderItem={({item})=> (
                <ListItem
                roundAvatar
                title={item.name}
                />
              )}
              />
        <TouchableHighlight onPress={this.logout}>
          <Text style={[styles.button, styles.greenButton]}>Logout</Text>
        </TouchableHighlight>
        </Card>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#077B89',
    marginTop: 20,
    width: width
  },
  button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    greenButton: {
        marginTop: 20,
        backgroundColor: '#4CD964'
    },
})

const mapState = ({ genres, user, owner }) => {
    return {
        user,
        genres,
        owner
    }
}

const mapDispatch = (dispatch) => {
    return {
        logoutUser: (navigate) => {
            dispatch(logoutUser(navigate));
        },
        fetchGenres: () => {
          dispatch(fetchGenres());
        },
        updateGenres
    }
}

export default connect(mapState, mapDispatch)(BarOwner);
