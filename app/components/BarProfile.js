import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Button, Text, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Card, ListItem, List } from 'react-native-elements'
let { width, height } = Dimensions.get('window')
import GenreMap from './GenreMap';

// const Back = StackNavigator({
//     Back: {screen: GenreMap },
//     }, {
//         headerMode: 'none'
//     })

export default class BarProfile extends Component {



    render() {
        const songs = [
            { title: 'Song1' },
            { title: 'Song2' },
            { title: 'Song3' },
        ];
        const bar = this.props.navigation.state.params;
        console.log(this.props.navigation.state)

        return (
            <View style={styles.container}>
                <Card
                    title={bar.name}
                    image={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcLzVure3ON14O3siJ4qcBRGiIel7RUCxBxlUIk6QzJIIxzsx4A' }} >
                    <Text style={{ marginBottom: 10 }}>
                        Low-key Irish tavern serving pints & a full menu of pub grub to Financial District types.
            </Text>
                    <Button
                        icon={{ name: 'code' }}
                        backgroundColor='#03A9F4'
                        fontFamily='Lato'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        onPress={() => console.log('assadfd')}
                        title='Directions' />

                    <List containerStyle={{ marginBottom: 20 }}>
                        {
                            songs.map((l, i) => (
                                <ListItem
                                    roundAvatar
                                    key={i}
                                    title={l.title}
                                />
                            ))
                        }
                    </List>
                </Card>
               <Button
               onPress={() => this.props.navigation.goBack()}
                title='Back' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 20,
        width: width
    }
})
