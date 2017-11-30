import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { MapView } from 'expo';
import { Button, Card, ListItem, List } from 'react-native-elements';
import { getDirectionsToBar, fetchBarsFromServer } from '../redux';

import BarProfile from './BarProfile';
import GetDirections from './GetDirections.js';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';

let { width, height } = Dimensions.get('window');
const Icons = require('./Icons');
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
            markerSelected: {},
            directions: {
                coords: [],
                time: '',
            },
            directionPressed: false,
            regionChanged: false,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapPress = this.onMapPress.bind(this);
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        this.onRegionButtonPress = this.onRegionButtonPress.bind(this);
        this.onPolyButtonPress = this.onPolyButtonPress.bind(this);
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((res) => {
            this.setState({ currentLocation: { latitude: res.coords.latitude, longitude: res.coords.longitude } }, () => { this.props.fetchBars(this.state.currentLocation); });
        }, (rej) => {
            this.setState({ currentLocation: { latitude: 40.74441723, longitude: -73.99442301 } }, () => { this.props.fetchBars(this.state.currentLocation); });
        });
    }
    onMarkerClick(ev) {
        this.setState({ markerSelected: ev });
        // fixes iOS callout overlay bug by animating the map (hopefully) imperceptibly
        this.map.animateToCoordinate({
            latitude: this.state.currentLocation.latitude + this.state.regionSize.latitudeDelta * 0.001,
            longitude: this.state.currentLocation.longitude + this.state.regionSize.longitudeDelta * 0.001,
        }, 0);
    }
    onMapPress() {
      if (!this.state.directionPressed && Object.keys(this.state.markerSelected).length > 0) {
        this.setState({markerSelected: {}});
      }
    }
    onRegionChangeComplete(region) {
        const {latitude, longitude} = region;
        this.setState({currentLocation: {latitude, longitude}, regionChanged: true});
    }
    onRegionButtonPress() {
        this.setState({regionChanged: false});
        this.props.fetchBars(this.state.currentLocation);
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
        let { currentLocation, regionSize, markerSelected, directions, directionPressed, regionChanged } = this.state;
        const genre = this.props.navigation.state.params ? this.props.navigation.state.params.genre : undefined;
        const selectedGenreName = this.props.navigation.state.params ? this.props.navigation.state.params.selectedGenreName : undefined;
        bars = genre ? bars.filter(bar => {
            return bar.genres.indexOf(genre) > 0;
        }) : bars;

        return (
            <View style={styles.container}>
                { currentLocation.latitude &&
                    <MapView
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
                                    style={[styles.callout, styles.shadow]}
                                    tooltip={true}
                                    onPress={() => navigate('SampleProfile', { bar: marker })}>
                                    <View style={styles.card}>
                                        <Text style={styles.calloutTextName}>
                                            {marker.name}
                                        </Text>
                                        <Text style={styles.calloutTextAddress}>
                                            {marker.address}
                                        </Text>
                                        <Button
                                            buttonStyle={styles.calloutButton}
                                            icon={{ name: 'info-circle', type: 'font-awesome' }}
                                            large={true}
                                            onPress={() => console.log('GenreMap: onPress()')} />
                                        <View style={styles.currentPlaying}>
                                            <Text style={styles.currentPlayingText}>Currently Playing: </Text>
                                            <Text style={styles.currentPlayingTextSong}>{marker.songs && marker.songs[0].song}</Text>
                                        </View>
                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
                        );})}
                        { directions.time.length > 0 && directionPressed &&
                            <MapView.Polyline
                                coordinates={directions.coords}
                                strokeWidth={4}
                                lineCap="round"
                                lineJoin="round"
                                strokeColor="rgba(255,140,0,0.8)" />
                        }
                    </MapView>
                }
                { Object.keys(markerSelected).length > 0 &&
                    <View style={styles.buttonRow}>
                            <Button style={[styles.polyButton, styles.shadow]}
                                backgroundColor={colors.redOrange}
                                color="#fff"
                                fontFamily={fonts.bold}
                                iconRight={directionPressed ? { name: 'stop', type: 'font-awesome' } : { name: 'forward', type: 'font-awesome' }}
                                onPress={this.onPolyButtonPress}
                                title={directionPressed ? `${directions.time} Away!` : 'Let\'s Go!'} />
                    </View>
                }
                { regionChanged &&
                    <View style={styles.buttonRow}>
                            <Button style={[styles.searchRegionButton, styles.shadow]}
                                backgroundColor={colors.redOrangeDark}
                                color="#fff"
                                fontFamily={fonts.bold}
                                iconRight={{ name: 'search', type: 'font-awesome' }}
                                onPress={this.onRegionButtonPress}
                                title="Search Area" />
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        borderColor: colors.redOrange,
        borderRadius: 5,
        borderWidth: 5,
    },
    searchRegionButton: {
        backgroundColor: colors.redOrangeDark,
        borderColor: colors.redOrangeDark,
        borderRadius: 5,
        borderWidth: 5,
    },
    shadow: {
        shadowColor: '#ccc',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
    }
});

const mapState = ({ bars, directions }) => {
    return { bars, directions };
};

const mapDispatch = (dispatch) => {
    return {
        fetchBars: (location) => {
            dispatch(fetchBarsFromServer(location));
        },
        getDirections: (start, end) => {
            dispatch(getDirectionsToBar(start, end));
        },
    };
};

export default connect(mapState, mapDispatch)(GenreMap);
