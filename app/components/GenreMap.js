import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Dimensions, Text, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GetDirections from './GetDirections.js';
import { SearchBar, Card, ListItem, List, FlatList } from 'react-native-elements'
import { getDirectionsToBar, fetchBarsFromServer } from '../redux';
import { setLocation } from '../redux/location';
import BarProfile from './BarProfile';
import BarList from './BarList';
import mapStyle from '../helper/mapStyle.js';
let { width, height } = Dimensions.get('window');
const Icons = require('../../assets/Icons');

class GenreMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLocation: {},
            regionSize: {
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            },
            focusArea: {},
            markerSelected: {},
            directions: {
                coords: [],
                time: ''
            },
            directionPressed: false,
            regionChanged: false,
            viewMode: 'map'
        };
        this.toggleView = this.toggleView.bind(this)
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
        this.onRegionButtonPress = this.onRegionButtonPress.bind(this)
        this.onPolyButtonPress = this.onPolyButtonPress.bind(this)
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
        this.setState({ markerSelected: ev })
    }
    onMapPress() {
        if (!this.state.directionPressed && Object.keys(this.state.markerSelected).length > 0) {
            this.setState({ markerSelected: {} })
        }
    }

    onRegionChangeComplete(region) {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        this.setState({ focusArea: { latitude, longitude }, regionSize: { latitudeDelta, longitudeDelta }, regionChanged: true })
    }
    onRegionButtonPress() {
        this.setState({ regionChanged: false })
        const { latitudeDelta, longitudeDelta } = this.state.regionSize;
        let delta = latitudeDelta > longitudeDelta ? latitudeDelta : longitudeDelta
        this.props.fetchBars(this.state.focusArea, delta / 3)
        this.props.setLocation({ currentLocation: this.state.focusArea, radius: delta / 3 })
    }
    onPolyButtonPress() {
        this.state.directionPressed = !this.state.directionPressed;
        if (this.state.directionPressed) {
            let { currentLocation, markerSelected } = this.state;
            getDirectionsToBar({ latitude: currentLocation.latitude, longitude: currentLocation.longitude }, { latitude: markerSelected.lat, longitude: markerSelected.lon })
                .then(res => this.setState({ directions: res }))
                .catch(er => console.log(er))
        } else {
            this.setState({ directions: { coords: [], time: '' } })
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
                {viewMode === 'map' && currentLocation.latitude &&
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        showsPointsOfInterest={false}
                        initialRegion={Object.assign({}, currentLocation, regionSize)}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        showsUserLocation={true}
                        showsCompass={true}
                        onPress={this.onMapPress}>
                        {bars.map(marker => {

                            let icon = genre ? Icons[marker.genreNames.find(genreName => { return genreName === selectedGenreName }).replace(/\s+/, "")] : Icons[marker.genreNames[0].replace(/\s+/, "")]
                            return (
                                <MapView.Marker
                                    coordinate={{
                                        latitude: marker.lat,
                                        longitude: marker.lon
                                    }}
                                    key={marker.id}
                                    onPress={this.onMarkerClick.bind(this, marker)}
                                    image={icon}
                                >
                                    <MapView.Callout style={styles.callout} onPress={() =>
                                        navigate('SampleProfile', { bar: marker })
                                    } >
                                        <View style={styles.card}>
                                            <Text style={{ fontWeight: 'bold', 'fontSize': 25 }}>{marker.name}</Text>
                                            <Text style={{ marginBottom: 10 }}>Address: {marker.address}</Text>
                                            <Button
                                                icon={{ name: 'code' }}
                                                backgroundColor='#03A9F4'
                                                fontFamily='Lato'
                                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                                onPress={() => console.log('assadfd')}
                                                title='Profile' />

                                            {marker.songs &&
                                                <View style={styles.currentPlaying}>
                                                    <Text>Currently Playing: </Text>
                                                    <Text> Song: {marker.songs[0].song} </Text>
                                                    <Text> Artist: {marker.songs[0].artist}</Text>
                                                </View>
                                            }

                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                            )
                        })}

                        {directions.time.length > 0 && directionPressed &&
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
                {viewMode === 'list' &&
                    <BarList bars={bars} navigate={navigate} />
                }
                {Object.keys(markerSelected).length > 0 && viewMode === 'map' &&
                    <View style={styles.polyButton}>
                        <Button onPress={this.onPolyButtonPress} title={directionPressed ? `${directions.time} Away! \n x Cancel Navigation` : 'Let\'s Go!'} />
                    </View>
                }
                {regionChanged && viewMode === 'map' &&
                    <View>
                        <Button onPress={this.onRegionButtonPress} title='Search This Area' />
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
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
    },
    search: {
        width: width
    },
    callout: {
        alignItems: 'center',
    },
    currentPlaying: {
        marginTop: 25,
    },
    card: {
        flex: 10,
        alignItems: 'center'
    },
    polyButton: {
        alignItems: 'center',
        marginTop: 25
    }
})

const mapState = ({ bars, directions }) => {
    return { bars, directions };
};

const mapDispatch = (dispatch) => {
    return {
        fetchBars: (location, radius) => {
            dispatch(fetchBarsFromServer(location, radius))
        },
        getDirections: (start, end) => {
            dispatch(getDirectionsToBar(start, end))
        },
        setLocation: (location) => {
            dispatch(setLocation(location));
        }
    }
}

export default connect(mapState, mapDispatch)(GenreMap);
