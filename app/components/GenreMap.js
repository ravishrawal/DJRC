import React from 'react';
import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native';
import { MapView } from 'expo';
import { SearchBar } from 'react-native-elements'
import axios from 'axios';
let { width, height } = Dimensions.get('window')

export default class GenreMap extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLocation: {},
            regionSize: {
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            },
            bars: []
        };
        this.onRegionChange = this.onRegionChange.bind(this)
    }
    componentDidMount() {
        axios.get('http://192.168.0.14:3002/api/venues')
            .then(res => res.data)
            .then(bars => {
                this.setState({ bars });
            })
            .catch(err => {
                console.log('error', err.message)
            })

        navigator.geolocation.getCurrentPosition((res, rej) => {
            res ? this.setState({ currentLocation: { latitude: res.coords.latitude, longitude: res.coords.longitude } }) : console.log(rej);
        });
    }
    onRegionChange(region) {
        let { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        this.setState({ currentLocation: { latitude, longitude }, regionSize: { latitudeDelta, longitudeDelta } })
    }
    render() {
        let { currentLocation, regionSize } = this.state;
        const coordinate = {
            latitude: 37.78825,
            longitude: -122.4324,
        };

        return (
            <View style={styles.container}>
                {currentLocation.latitude &&
                    <MapView
                        style={styles.map}
                        initialRegion={Object.assign({}, currentLocation, regionSize)}
                        onRegionChange={this.onRegionChange}
                        showsUserLocation={true}>
                        {this.state.bars.map(marker => (

                            <MapView.Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lon
                                }}
                                title={marker.name}
                                description = 
                                {`Address: ${marker.address}`}
                                key = {marker.id}
                            />
                        ))}
                    </MapView>
                }
                <View style={styles.search}>
                    <SearchBar
                        lightTheme
                        round
                        placeholder='Type Here...' />
                </View>

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
        width: width,
        marginTop: 20

    }
})
