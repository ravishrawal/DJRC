import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, SearchBar, Card, ListItem, List, FlatList } from 'react-native-elements';
import { getDirectionsToBar, fetchBarsFromServer } from '../redux';
import { setLocation } from '../redux/location';

import BarList from './BarList';
import BarProfile from './BarProfile';
import GetDirections from './GetDirections.js';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js'
import { log } from 'util';
// import mapStyle from '../helper/mapStyle.js';

let { width, height } = Dimensions.get('window');
const Icons = require('../../assets/Icons');
const userLocationTitle = 'This is you!'; // changes default: 'My Location'

class GenreMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {},
            regionSize: {
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            },
            focusArea: {},
            markerSelected: {},
            directions: {
                coords: [],
                time: '',
            },
            directionPressed: false,
            regionChanged: false,
            viewMode: 'map',
        };
        this.toggleView = this.toggleView.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapPress = this.onMapPress.bind(this);
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        this.onRegionButtonPress = this.onRegionButtonPress.bind(this);
        this.onPolyButtonPress = this.onPolyButtonPress.bind(this);
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((res) => {
            this.setState({ currentLocation: { latitude: res.coords.latitude, longitude: res.coords.longitude } }, () => {
                this.props.fetchBars(this.state.currentLocation, this.state.regionSize.latitudeDelta)
                this.props.setLocation({ currentLocation: this.state.currentLocation })
            })
        }, (rej) => {
            this.setState({ currentLocation: { latitude: 40.74441723, longitude: -73.99442301 } }, () => {
                this.props.fetchBars(this.state.currentLocation, this.state.regionSize.latitudeDelta)
                this.props.setLocation({ currentLocation: this.state.currentLocation })
            })
        });
    }
    toggleView() {
        this.state.viewMode === 'map' ? this.setState({ viewMode: 'list' }) : this.setState({ viewMode: 'map' });
    }
    onMarkerClick(ev) {
        this.setState({ markerSelected: ev });
        // fixes iOS callout overlay bug by animating the map (hopefully) imperceptibly
        console.log(ev)
        this.map.animateToCoordinate({
            latitude: ev.lat + this.state.regionSize.latitudeDelta * 0.0001,
            longitude: ev.lon + this.state.regionSize.longitudeDelta * 0.0001,
        }, 0);
    }
    onMapPress() {
        if (!this.state.directionPressed && Object.keys(this.state.markerSelected).length > 0) {
            this.setState({ markerSelected: {} });
        }
    }
    onRegionChangeComplete(region) {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        this.setState({ focusArea: { latitude, longitude }, regionSize: { latitudeDelta, longitudeDelta }, regionChanged: true });
    }
    onRegionButtonPress() {
        this.setState({ regionChanged: false });
        const { latitudeDelta, longitudeDelta } = this.state.regionSize;
        let delta = latitudeDelta > longitudeDelta ? latitudeDelta : longitudeDelta;
        this.props.fetchBars(this.state.focusArea, delta / 3);
        this.props.setLocation({ currentLocation: this.state.focusArea, radius: delta / 3 });
    }
    onPolyButtonPress() {
        this.state.directionPressed = !this.state.directionPressed;
        if (this.state.directionPressed) {
            let { currentLocation, markerSelected } = this.state;
            getDirectionsToBar({latitude: currentLocation.latitude, longitude: currentLocation.longitude}, {latitude: markerSelected.lat, longitude: markerSelected.lon})
            .then(res => this.setState({ directions: res }))
            .catch(er => console.log(er));
        } else {
            this.setState({ directions: { coords: [], time: '' } });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        let { bars } = this.props;
        let { currentLocation, regionSize, markerSelected, directions, directionPressed, regionChanged, viewMode } = this.state;
        const genre = this.props.navigation.state.params ? this.props.navigation.state.params.genre : undefined;
        const selectedGenreName = this.props.navigation.state.params ? this.props.navigation.state.params.selectedGenreName : undefined;
        bars = genre ? bars.filter(bar => {
            return bar.genres.indexOf(genre) >= 0;
        }) : bars;

        return (
            <View style={styles.container}>
                { currentLocation.latitude &&
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        color="#fff"
                        showsPointsOfInterest={false}
                        initialRegion={ Object.assign({}, currentLocation, regionSize) }
                        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                        showsCompass={false}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        userLocationAnnotationTitle={userLocationTitle}
                        ref={ref => { this.map = ref; }}
                        onPress={this.onMapPress}>
                        { bars.map(marker => {
                            let icon = genre ? Icons[marker.genreNames.find(genreName => { return genreName === selectedGenreName; }).replace(/\s+/, '')] : Icons[ marker.genreNames[0].replace(/\s+/, '')];
                            return (
                            <MapView.Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lon
                                }}
                                key={marker.id}
                                onPress={this.onMarkerClick.bind(this, marker)}
                                image={icon}>
                                <MapView.Callout
                                    style={styles.callout}
                                    tooltip={true}
                                    onPress={() => navigate('SampleProfile', { bar: marker })}>
                                    <View style={styles.card}>
                                        <Text style={styles.calloutTextName}>
                                            {marker.name}
                                        </Text>
                                        <Text style={styles.calloutTextAddress}>
                                            {marker.address}
                                        </Text>
                                        { marker.songs &&
                                            <View style={styles.currentPlaying}>
                                                <Text style={styles.currentPlayingText}>Currently Playing: </Text>
                                                <Text style={styles.currentPlayingTextSong}>Song: {marker.songs && marker.songs[0].song}</Text>
                                                <Text style={styles.currentPlayingTextSong}>Artist: {marker.songs && marker.songs[0].artist}</Text>
                                            </View>
                                        }

                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
                        );})}
                        { directions.time.length > 0 && directionPressed &&
                            <MapView.Polyline
                                coordinates={directions.coords}
                                strokeWidth={6}
                                lineCap='round'
                                lineJoin='round'
                                strokeColor="#ff6763" />
                        }
                    </MapView>
                }
                {
                    <View>
                        <Button onPress={this.toggleView} title={`Toggle View`} />
                    </View>
                }
                { viewMode === 'list' &&
                    <BarList bars={bars} navigate={navigate} />
                }
                { Object.keys(markerSelected).length > 0 && viewMode === 'map' &&
                    <View style={styles.buttonRow}>
                        <Button
                            backgroundColor={colors.redOrange}
                            buttonStyle={[styles.polyButton, commonStyles.roundedCorners, commonStyles.shadow]}
                            color="#fff"
                            fontFamily={fonts.bold}
                            onPress={this.onPolyButtonPress}
                            title={directionPressed ? `${directions.time} Away!` : 'Let\'s Go!'}
                            iconRight={directionPressed ? { name: 'stop', type: 'font-awesome' } : { name: 'forward', type: 'font-awesome' }}/>
                    </View>
                }
                { regionChanged && viewMode === 'map' &&
                    <View>
                        <Button onPress={this.onRegionButtonPress} title="Search This Area" />
                    </View>
                }
                {genre &&
                    <View>
                        <Button onPress={() => navigate('Map', { genre: null, selectedGenreName: null })} title={`${selectedGenreName}\nxRemove Filter`} />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonRow: {
        marginBottom: 10,
        marginTop: 25,
    },
    callout: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderColor: colors.blue,
        borderRadius: 5,
        borderWidth: 5,
        paddingLeft: 5,
        paddingRight: 5,
        shadowColor: '#ccc',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.75,
    },
    calloutButton: {
        backgroundColor: colors.blue,
    },
    calloutTextName: {
        color: colors.yellowLight,
        fontFamily: fonts.bold,
        fontSize: 25,
    },
    calloutTextAddress: {
        color: '#fff',
        fontFamily: fonts.bold,
        fontSize: 15,
    },
    card: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        flex: 10,
    },
    container: {
        alignItems: 'center',
        backgroundColor: colors.offWhite,
        flex: 1,
    },
    currentPlaying: {
        margin: 0,
    },
    currentPlayingText: {
        color: '#fff',
        fontFamily: fonts.regular,
        fontSize: 15,
    },
    currentPlayingTextSong: {
        color: colors.yellowLight,
        fontFamily: fonts.bold,
        fontSize: 20,
    },
    map: {
        backgroundColor: colors.redOrange,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    polyButton: {
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange
    },
});

const mapState = ({ bars, directions }) => {
    return { bars, directions };
};

const mapDispatch = (dispatch) => {
    return {
        fetchBars: (location, radius) => {
            dispatch(fetchBarsFromServer(location, radius));
        },
        getDirections: (start, end) => {
            dispatch(getDirectionsToBar(start, end));
        },
        setLocation: (location) => {
            dispatch(setLocation(location));
        }
    }
}

export default connect(mapState, mapDispatch)(GenreMap);
