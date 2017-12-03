import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Picker, FlatList, TouchableHighlight } from 'react-native';
import { Card, ListItem, List, Icon, FormLabel, FormInput, Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/user'
import { updateGenres, addPromo } from '../redux/bars'
import { fetchGenres } from '../redux/genres';
import { fetchPromos, deletePromo } from '../redux/promos';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';

let { width, height } = Dimensions.get('window');

class BarOwner extends Component {
  constructor(){
    super()
    this.state = {
      formVisible: false,
      genreArr: [1],
      promoText: ''

    }

    this.logout = this.logout.bind(this);
    this.updateGenre = this.updateGenre.bind(this);
    this.submitGenreUpdate = this.submitGenreUpdate.bind(this);
    this.changePromo = this.changePromo.bind(this);
    this.submitPromo = this.submitPromo.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.removePromo = this.removePromo.bind(this)
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
  }

  removePromo(promoId){
    this.props.deletePromo(promoId);
  }

  submitPromo(){
    this.props.addPromo(this.props.owner.id, this.state.promoText)
    this.setState({
      promoText: ''
    })
    this.toggleForm();
    this.props.fetchPromos(this.props.owner.id)
    alert('Promo added!');
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

  render() {

    const { updateGenre, submitGenreUpdate, changePromo, submitPromo, toggleForm, removePromo } = this;

    const genres = this.state.genreArr

    const allGenres = this.props.genres.length && this.props.genres;

    function renderRow(promo){

     const swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {deletePromo(promo.id)}
      }]
      return (
        <Swipeout
        right={swipeBtns}
        autoclose='true'
        backgroundColor='transparent'>

          <ListItem
          titleStyle={[styles.text, {alignSelf: 'center'}]}
          roundAvatar
          key={promo.id}
          title={promo.description}
        />
        </Swipeout>
      )
    }



    return (

      <View style={styles.container}>
        { this.state.formVisible ?
          <View style={styles.form}>
            <FormLabel> Promo Description </FormLabel>
            <FormInput onChangeText={changePromo} ></FormInput>

            <Button
            fontFamily={fonts.bold}
            buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
              onPress={() => submitPromo()}
              title='Save Promo'
            />
            <Button
            fontFamily={fonts.bold}
            buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
              onPress={() => toggleForm()}
              title='Go Back' />
        </View>
        :
        <Card 
        containerStyle={styles.card}
        title = { this.props.owner.name } >
          <View style ={{alignItems: 'center', marginBottom: 10}}>
            <Text style={styles.text}>
              Update Your Genre
            </Text>
            </View>
            <View style = {styles.border}>
            <Picker
            style = {  {color: colors.blue, marginTop: 10, marginBottom: 10, alignItems: 'center'}}
            selectedValue={genres[0]}
            onValueChange={ updateGenre }>
              {allGenres.length && allGenres.map((gen)=> (
                
                <Picker.Item label={gen.name} value={gen.key} key={gen.key} />
                
                ))}
            </Picker>
                </View>
            <Button
            fontFamily={fonts.bold}
            buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
              onPress = { submitGenreUpdate }
              title= 'Submit Genre Changes'
            />


            <Button
            fontFamily={fonts.bold}
            buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
              onPress={() => toggleForm()}
              title='Add Promo!'
            />


            <Text style={[styles.text, {marginTop: 10}]}>
              Current Promos
            </Text>

              <View>
              <List containerStyle={{ marginBottom: 20 }}>
                {
                 this.props.owner.promos && this.props.owner.promos.length ? this.props.owner.promos.map((promo) => (
                  <View key = {promo.id}>
                    {renderRow(promo)}
                    </View>
                    )) :

                          <Text>
                           </Text>
                          }
              </List>

            </View>



        <Button onPress={this.logout}
        fontFamily={fonts.bold}
        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
        title='Logout'
        >
        </Button>
        </Card>
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  border: {
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#d6d7da'
  },
  form: {
    alignItems: 'center',
    width: width
  },
    greenButton: {
        marginTop: 20,
        backgroundColor: '#4CD964'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      marginTop: 20,
      width: width
  },
  card: {
    alignItems: 'center',
    width: width
},
  button: {
      alignItems: 'center',
      backgroundColor: colors.redOrange,
      borderColor: colors.redOrange,
      margin: 10,
      width: 200,
  },
  text: {
      color: colors.blue,
      fontFamily: fonts.regular,
      fontSize: 20,
  },
  
})

const mapState = ({ genres, user, owner, promos }) => {
    return {
        user,
        genres,
        owner,
        promos
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
        fetchPromos: (venueId) => {
          dispatch(fetchPromos(venueId))
        },
        updateGenres,
        addPromo,
        deletePromo
    }
}

export default connect(mapState, mapDispatch)(BarOwner);
