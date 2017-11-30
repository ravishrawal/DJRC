import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Button, Text } from 'react-native';
import { Card, ListItem, List } from 'react-native-elements'
import { fetchVenueReviews } from '../redux/reviews';
import Modal from 'react-native-modal'
import Stars from 'react-native-stars';

import GenreMap from './GenreMap';
import Review from './Review';


let { width, height } = Dimensions.get('window')

class BarProfile extends Component {
    constructor() {
        super()
        this.state = {
            isModalVisibleRead: false,
            isModalVisibleWrite: false,
        }
        this._hideModalWrite = this._hideModalWrite.bind(this);
        this._showModalWrite = this._showModalWrite.bind(this);
        this._hideModalRead = this._hideModalRead.bind(this);
        this._showModalRead = this._showModalRead.bind(this);
    }

    componentDidMount() {
        const { bar } = this.props.navigation.state.params;
        this.props.fetchVenueReviews(bar.id)
    }

    _showModalWrite() {
        this.setState({ isModalVisibleWrite: true })
    }

    _hideModalWrite() {
        this.setState({ isModalVisibleWrite: false })
    }

    _showModalRead() {
        this.setState({ isModalVisibleRead: true })
    }

    _hideModalRead() {
        this.setState({ isModalVisibleRead: false })
    }



    render() {
        const defaultSongs = [
            { song: 'Song1' },
            { song: 'Song2' },
            { song: 'Song3' },
        ];
        const { bar } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        const songs = bar.songs && bar.songs.length ? bar.songs.slice(0, 3) : defaultSongs;
        // const avgRating = this.props.reviews && (this.props.reviews.reduce((memo, review) => {
        //     return memo + Number(review.rating);
        // }, 0)) / this.props.reviews.length;
        
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

                    {this.props.user && this.props.user.id ?
                        <View style={{ marginTop: 10 }} >
                            <Button
                                onPress={this._showModalRead}
                                title='Read Reviews' />
                            <Modal isVisible={this.state.isModalVisibleRead}>
                                <View style={{ flex: 1 }}>
                                    <List containerStyle={{ marginBottom: 20 }}>
                                        {
                                            this.props.reviews && this.props.reviews.length ? this.props.reviews.map((review, i) => (
                                                <View key = {i}>
                                                    <ListItem
                                                        roundAvatar
                                                        key={i}
                                                        title={review.content}
                                                        avatar={<View style={{ alignItems: 'center' }}>
                                                            <Stars
                                                                value={Number(review.rating)}
                                                                spacing={8}
                                                                count={5}
                                                                starSize={10}
                                                                fullStar={require('../../assets/starFilled.png')}
                                                                emptyStar={require('../../assets/starEmpty.png')} />
                                                        </View>}
                                                    />

                                                </View>
                                            ))
                                                :
                                                null
                                        }
                                    </List>
                                    <Button
                                        onPress={this._hideModalRead}
                                        title='Go Back' />
                                </View>
                            </Modal>
                        </View>
                        : null}

                    <List containerStyle={{ marginBottom: 20 }}>
                        {
                            songs.map((song, i) => (

                                <ListItem
                                    roundAvatar
                                    key={i}
                                    title={song.song}
                                />
                            ))
                        }
                    </List>

                    {this.props.user && this.props.user.id ?
                        <View>
                            <Button
                                onPress={this._showModalWrite}
                                title='Write a Review' />
                            <Modal isVisible={this.state.isModalVisibleWrite}>
                                <View style={{ flex: 1 }}>
                                    <Review bar={bar} _hideModal={this._hideModalWrite} />
                                    <Button
                                        onPress={this._hideModalWrite}
                                        title='Cancel' />
                                </View>
                            </Modal>
                        </View>
                        : null}

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

const mapState = ({ reviews, user }) => {
    return {
        reviews, user
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchVenueReviews: (venueId) => {
            dispatch(fetchVenueReviews(venueId))
        }
    }
}

export default connect(mapState, mapDispatch)(BarProfile)
