import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Dimensions, Picker, FlatList, TouchableHighlight } from 'react-native';
import { Card, ListItem, List, Icon, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/user'
import { updateGenres, addPromo } from '../redux/bars'
import { fetchGenres } from '../redux/genres';


// import { fetchOneBar } from '../redux/bars'
let { width, height } = Dimensions.get('window');

class BarOwner extends Component {
  constructor(){
    super()
    this.state = {
      formVisible: false,
      genreArr: [1],
      promoText: ''

    }
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.updateGenre = this.updateGenre.bind(this);
    this.submitGenreUpdate = this.submitGenreUpdate.bind(this);
    this.changePromo = this.changePromo.bind(this);
    this.submitPromo = this.submitPromo.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount(){
    this.props.fetchGenres();
  }

  logout() {
    const { navigate } = this.props.navigation;
    this.props.logoutUser(navigate);
  }

  changePromo(promoText){
    this.setState({promoText: promoText})
    console.log(this.state.promoText);
  }

  submitPromo(){
    this.props.addPromo(this.props.owner.id, this.state.promoText)
    this.setState({
      promoText: ''
    })
    this.toggleForm();
  }

  toggleForm(){
    this.setState({
      formVisible: !this.state.formVisible
    })
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

    const { updateGenre, submitGenreUpdate, changePromo, submitPromo, toggleForm } = this;

    const genres = this.state.genreArr

    const allGenres = this.props.genres.length && this.props.genres;

    const promos = this.props.owners && this.props.owners.promos

    return (
      <View style={styles.container}>
        <Card title = { this.props.owner.name } >
          <Text stlye={{ marginBottom: 10}}>
            This is info about your bar. Maybe Stats?
          </Text>
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

            { this.state.formVisible ?
              <View style={styles.form}>
                <FormLabel> Promo Description </FormLabel>
                <FormInput onChangeText={changePromo} ></FormInput>

                <Button
                  onPress={() => submitPromo()}
                  title='Save Promo'
                />
            </View>
            :
            <Button
              onPress={() => toggleForm()}
              title='Add Promo!'
            />
            }

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
  form: {
    alignItems: 'center',
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
        updateGenres,
        addPromo
    }
}

export default connect(mapState, mapDispatch)(BarOwner);
