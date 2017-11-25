import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Dimensions, Picker, FlatList, TouchableHighlight } from 'react-native';
import { Card, ListItem, List, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser, fetchOwner } from '../redux/user'
// import { fetchOneBar } from '../redux/bars'
let { width, height } = Dimensions.get('window');

class BarOwner extends Component {
  constructor(){
    super()
    this.state = {
      formVisible: false,

    }
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.logout = this.logout.bind(this);
  }



    logout() {
      const { navigate } = this.props.navigation;
      this.props.logoutUser(navigate);
    }

    // componentWillMount(){
    //   this.setState({
    //     bar: fetchOneBar(this.props.user.id)
    //   })
    // }

    // onSubmitHandler(ev){
    //   ev.preventDefault();
    //   this.setState({
    //     formVisible: !this.state.formVisible
    //   })
    // }
  render() {
    console.log(this.state, "state")
    console.log(this.props, "props")
    const venue = this.props.fetchOwner(this.props.user.id)
    console.log(venue)

    const genres = [
    {name: 'rap',
    id: 1},
    {name: 'chill',
    id: 2}
    ];

    const allGenres = [
    {name: 'rap',
    id: 1},
    {name: 'chill',
    id: 2},
    {name: 'country',
    id: 3},
    {name: 'pop',
    id: 4}
    ];

    const promos = [
    {name: 'Buy 1 get 1 free'},
    {name: '3 Beers and wings to make you feel awful'}
    ]

    return (
      <View style={styles.container}>
        <Card title = 'Your Bar Name' >
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
              Current Genres
            </Text>
            <Picker
            // selectedValue={genres[0]}
            onValueChange={(itemValue)=> genres[0].name = itemValue}>
              {allGenres.map((gen)=> (
                <Picker.Item label={gen.name} value={gen.name} key={gen.id} />
                ))}
            </Picker>
            <Picker selectedValue={genres[1]}>
              {allGenres.map((gen)=> (
                <Picker.Item label={gen.name} value={gen.name} key={gen.id} />
                ))}
            </Picker>
            <Button
              raised
              iconRight
              icon={{ name: 'music'}}
              onPress={() => alert('Add Promo!')}
              title='Add Promo!' />

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
        <TouchableHighlight onPress={this.logout}>
          <Text style={[styles.button, styles.greenButton]}>Logout</Text>
        </TouchableHighlight>
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

const mapState = ({ user }) => {
    return {
        user
    }
}

const mapDispatch = (dispatch) => {
    return {
        logoutUser: (navigate) => {
            dispatch(logoutUser(navigate));
        },
        fetchOwner: fetchOwner
        // fetchOneBar: fetchOneBar
    }
}

export default connect(mapState, mapDispatch)(BarOwner);
