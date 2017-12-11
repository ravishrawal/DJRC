import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Card, ListItem, List, Button } from 'react-native-elements';

import { fetchVenueReviews } from '../store/reviews';
import { fetchPromos } from '../store/promos';

import GetDirections from './GetDirections';
import Modal from 'react-native-modal';
import Review from './Review';
import Stars from 'react-native-stars';

import colors from '../helper/colors.js';
import commonStyles from '../helper/styles.js';
import fonts from '../helper/fonts.js';

let { height, width } = Dimensions.get('window');

class BarProfile extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisibleRead: false,
            isModalVisibleWrite: false,
            promoModalVisible: false
        };
        this._hideModalWrite = this._hideModalWrite.bind(this);
        this._showModalWrite = this._showModalWrite.bind(this);
        this._hideModalRead = this._hideModalRead.bind(this);
        this._showModalRead = this._showModalRead.bind(this);
        this.togglePromoModal = this.togglePromoModal.bind(this);
    }
    componentDidMount() {
        const { bar } = this.props.navigation.state.params;
        this.props.fetchVenueReviews(bar.id);
        // this.props.fetchPromos(bar.id);
    }
    togglePromoModal() {
        this.setState({ promoModalVisible: !this.state.promoModalVisible });
    }
    _showModalWrite() {
        this.setState({ isModalVisibleWrite: true });
    }
    _hideModalWrite() {
        this.setState({ isModalVisibleWrite: false });
    }
    _showModalRead() {
        this.setState({ isModalVisibleRead: true });
    }
    _hideModalRead() {
        this.setState({ isModalVisibleRead: false });
    }
    render() {
        // const defaultSongs = [
        //     { song: 'Song1' },
        //     { song: 'Song2' },
        //     { song: 'Song3' },
        // ];
        // const { navigate } = this.props.navigation;
        const { bar } = this.props.navigation.state.params;
        const songs = bar.songs && bar.songs.length ? bar.songs.slice(0, 3) : [];

        return (
            <View style={styles.container}>
                <Card
                    containerStyle={styles.card}
                    fontFamily={fonts.regular}
                    title={`${bar.name} \n ${bar.genreNames} \n`}
                    titleStyle={{ fontSize: 20 }}>
                    {
                        bar.avgRating > 0 ?
                            <View style={{ marginBottom: 20 }}>
                                <Stars
                                    value={Number(bar.avgRating)}
                                    spacing={8}
                                    count={5}
                                    starSize={20}
                                    fullStar={require('../../assets/starFilled.png')}
                                    emptyStar={require('../../assets/starEmpty.png')} />
                            </View>
                            :
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.text}>No Reviews</Text>
                            </View>
                    }
                    <GetDirections
                        barLocation={{ latitude: bar.lat, longitude: bar.lon }}
                    />
                    <View style={{ marginTop: 10 }} >
                        <Button
                            buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                            fontFamily={fonts.bold}
                            onPress={this.togglePromoModal}
                            title="See Promos" />
                        <Modal isVisible={this.state.promoModalVisible}>
                            <View style={{ flex: 1 }}>
                                <List containerStyle={{ marginBottom: 20 }}>
                                    {
                                        bar.promos && bar.promos.length ? bar.promos.map((promo, i) => (
                                            <View key={i}>
                                                <ListItem
                                                    hideChevron = {true}
                                                    key={i}
                                                    roundAvatar
                                                    titleStyle={[styles.text, {alignSelf: 'center'}]}
                                                    title={promo} />
                                            </View>
                                        ))
                                        :
                                        <Text>Sorry no current promos!</Text>
                                    }
                                </List>
                                <View style={{alignItems: 'center'}}>
                                    <Button
                                        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                        fontFamily={fonts.bold}
                                        onPress={this.togglePromoModal}
                                        title="Go Back" />
                                </View>
                            </View>
                        </Modal>
                        <Button
                            buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow, { marginBottom: 15 }]}
                            fontFamily={fonts.bold}
                            onPress={this._showModalRead}
                            title="Read Reviews" />
                        <Modal isVisible={this.state.isModalVisibleRead}>
                            <View style={{ flex: 1 }}>
                                <List
                                    containerStyle={{ marginBottom: 20 }}>
                                    {
                                        this.props.reviews && this.props.reviews.length ? this.props.reviews.map((review, i) => (
                                            <View key={i}>
                                                <ListItem
                                                    avatar={
                                                        <View style={{ alignItems: 'center' }}
                                                            key={i}
                                                            hideChevron = {true}
                                                            roundAvatar
                                                            title={review.content}>
                                                                <Stars
                                                                    count={5}
                                                                    emptyStar={require('../../assets/starEmpty.png')}
                                                                    fullStar={require('../../assets/starFilled.png')}
                                                                    spacing={8}
                                                                    starSize={10}
                                                                    value={Number(review.rating)}/>
                                                        </View>
                                                    }/>
                                            </View>
                                            ))
                                        :
                                            null
                                    }
                                </List>
                                <View style={{alignItems: 'center'}}>
                                    <Button
                                        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow, { marginBottom: 15 }]}
                                        onPress={this._hideModalRead}
                                        title="Go Back" />
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {
                        songs.length ?
                            <List containerStyle={{ marginBottom: 20 }}>
                                {
                                    songs.map((song, i) => (
                                        <ListItem
                                            hideChevron = {true}
                                            key={i}
                                            roundAvatar
                                            title={`${song.artist}`}
                                            titleStyle={[styles.text, {alignSelf: 'center'}]}/>
                                    ))
                                }
                            </List>
                        :
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.text}>This bar does not share songs</Text>
                            </View>
                    }
                    {
                        this.props.user && this.props.user.id ?
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button
                                        buttonStyle={[commonStyles.roundedCorners, commonStyles.shadow, {
                                            backgroundColor: colors.redOrange,
                                            borderColor: colors.redOrange
                                        }]}
                                        fontFamily={fonts.bold}
                                        onPress={this._showModalWrite}
                                        title="Write a Review" />
                                    <Button
                                        buttonStyle={[commonStyles.roundedCorners, commonStyles.shadow, {
                                            backgroundColor: colors.redOrange,
                                            borderColor: colors.redOrange
                                        }]}
                                        onPress={() => this.props.navigation.goBack()}
                                        title="Back" />
                                </View>
                                <Modal isVisible={this.state.isModalVisibleWrite}>
                                    <View style={{ flex: 1 }}>
                                        <Review bar={bar} _hideModal={this._hideModalWrite} navigate={this.props.navigation} />
                                        <View style = {{ alignItems: 'center' }}>
                                            <Button
                                                buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                                onPress={this._hideModalWrite}
                                                title="Cancel" />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        :
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.text]}>Log in to write a review!</Text>
                                    <Button
                                        buttonStyle={[commonStyles.roundedCorners, commonStyles.shadow, {
                                            backgroundColor: colors.redOrange,
                                            borderColor: colors.redOrange
                                        }]}
                                        onPress={() => this.props.navigation.goBack()}
                                        title="Back" />
                            </View>
                    }
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        width: 200,
    },
    card: {
        alignItems: 'center',
        width: width,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        marginTop: 20,
        width: width,
    },
    text: {
        color: colors.blue,
        fontFamily: fonts.regular,
        fontSize: 20,
    }
});

const mapState = ({ reviews, user, promos }) => {
    return {
        reviews, user, promos
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchVenueReviews: (venueId) => {
            dispatch(fetchVenueReviews(venueId));
        },
        fetchPromos: (venueId) => {
            dispatch(fetchPromos(venueId));
        }
    };
};

export default connect(mapState, mapDispatch)(BarProfile);
