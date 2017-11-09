import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Dimensions, Text, Button } from 'react-native';
import { MapView } from 'expo';
import { SearchBar, Card, ListItem, List } from 'react-native-elements'
import { fetchBarsFromServer } from '../redux/bars';

import BarProfile from './BarProfile';

let { width, height } = Dimensions.get('window')

class GenreMap extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLocation: {},
            regionSize: {
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            }
        };
        this.onRegionChange = this.onRegionChange.bind(this)
    }
    componentDidMount() {
        this.props.fetchBarsFromServer();
        navigator.geolocation.getCurrentPosition((res, rej) => {
            res ? this.setState({ currentLocation: { latitude: res.coords.latitude, longitude: res.coords.longitude } }) : console.log(rej);
        });
    }
    onRegionChange(region) {
        let { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        this.setState({ currentLocation: { latitude, longitude }, regionSize: { latitudeDelta, longitudeDelta } })
    }

    render() {
        const { navigate } = this.props.navigation;
        let { bars } = this.props;
        let { currentLocation, regionSize } = this.state;
        const genre = this.props.navigation.state.params ? this.props.navigation.state.params.genre : '';
        bars = genre ? bars.filter(bar => {
            return bar.genres.indexOf(genre) > 0;
        }) : bars;

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
                        {bars.map(marker => (

                            <MapView.Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lon
                                }}
                                key={marker.id}
                            >
                                <MapView.Callout style={styles.callout} onPress={() =>
                                    navigate('SampleProfile', { name: marker.name })
                                  } >
                                    <View style={styles.card}>
                                        <Text style={{ fontWeight: 'bold', 'fontSize': 25 }}>{marker.name}</Text>
                                        <Text style={{ marginBottom: 10 }}>
                                            Address: {marker.address}</Text>
                                        <Button
                                            icon={{ name: 'code' }}
                                            backgroundColor='#03A9F4'
                                            fontFamily='Lato'
                                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                            onPress={() => console.log('assadfd')}
                                            title='Profile' />
                                        <View style={styles.currentPlaying}>
                                            <Text>Currently Playing: </Text>
                                            <Text> Great Song! </Text>
                                        </View>
                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
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
    }
})

const mapState = ({ bars }) => {
    return { bars };
};

const mapDispatch = (dispatch) => {
    return {
        fetchBarsFromServer: () => {
            dispatch(fetchBarsFromServer());
        }
    }
}

export default connect(mapState, mapDispatch)(GenreMap);