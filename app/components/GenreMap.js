import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Dimensions, Text, Button } from 'react-native';
import { MapView } from 'expo';
import GetDirections from './GetDirections.js';
import { SearchBar, Card, ListItem, List } from 'react-native-elements'
import { fetchBarsFromServer } from '../redux/bars';
import BarProfile from './BarProfile';
let { width, height } = Dimensions.get('window');

class GenreMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLocation: {},
            regionSize: {
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            },
            markerSelected: {}
        };
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
    }
    componentDidMount() {
        this.props.fetchBarsFromServer();
        navigator.geolocation.getCurrentPosition((res, rej) => {
            res ? this.setState({ currentLocation: { latitude: res.coords.latitude, longitude: res.coords.longitude } }) : console.log(rej);
        });
    }
    onMarkerClick(ev){
      this.setState({markerSelected:ev})
    }
    onMapPress(){
      if(Object.keys(this.state.markerSelected).length>0){
        this.setState({markerSelected:{}})
      }
    }
    render() {
        const { navigate } = this.props.navigation;
        let { bars } = this.props;
        let { currentLocation, regionSize, markerSelected } = this.state;
        const genre = this.props.navigation.state.params ? this.props.navigation.state.params.genre : '';
        bars = genre ? bars.filter(bar => {
            return bar.genres.indexOf(genre) > 0;
        }) : bars;

        return (
            <View style={styles.container}>
                {currentLocation.latitude &&
                    <MapView
                        style={styles.map}
                        initialRegion={Object.assign({}, currentLocation, regionSize)}
                        showsUserLocation={true}
                        onPress={this.onMapPress}>
                        {bars.map(marker => (

                            <MapView.Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lon
                                }}
                                key={marker.id}
                                onPress={this.onMarkerClick.bind(this, marker)}
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
                { Object.keys(markerSelected).length>0 &&
                  <View>
                    <GetDirections
                      currentLocation={ currentLocation }
                      destLocation={{latitude: markerSelected.lat, longitude: markerSelected.lon}}
                    />
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
    }
})

const mapState = ({ bars, directions }) => {
    return { bars, directions };
};

const mapDispatch = (dispatch) => {
    return {
        fetchBarsFromServer: () => {
            dispatch(fetchBarsFromServer());
        }
    }
}

export default connect(mapState, mapDispatch)(GenreMap);
