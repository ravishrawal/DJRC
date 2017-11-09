import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { MapView } from 'expo';
import { SearchBar } from 'react-native-elements'

import { fetchBarsFromServer, getDirectionsToBar } from '../redux';

let { width, height } = Dimensions.get('window')

class GenreMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLocation: {},
            regionSize: {
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            },
            markerSelected: {},
            directionPressed: false
        };
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onDirectionPress = this.onDirectionPress.bind(this)
    }
    componentDidMount() {
        this.props.fetchBarsFromServer();
        navigator.geolocation.getCurrentPosition((res, rej) => {
            res ? this.setState({ currentLocation: { latitude: res.coords.latitude, longitude: res.coords.longitude } }) : console.log(rej);
        });
    }
    // onRegionChange(region) {
    //     let { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    //     this.setState({ currentLocation: { latitude, longitude }, regionSize: { latitudeDelta, longitudeDelta } })
    // }
    onMarkerClick(ev){
      this.setState({markerSelected:ev})
    }
    onDirectionPress(){
      this.setState({directionPressed:!this.state.directionPressed})
      if(this.state.directionPressed) this.props.getDirections(this.state.markerSelected, this.state.currentLocation);
    }
    render() {
        let { bars, directions, markerClick } = this.props;
        let { currentLocation, regionSize, directionPressed, markerSelected } = this.state;
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
                        showsUserLocation={true}>
                        {bars.map(marker => (

                            <MapView.Marker
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lon
                                }}
                                title={marker.name}
                                description=
                                {`Address: ${marker.address}`}
                                key={marker.id}
                                onPress={this.onMarkerClick.bind(this, marker)}
                            />
                        ))}
                        {directions && directionPressed &&
                            <MapView.Polyline
                              coordinates={directions.coords}
                              strokeWidth={4}
                              lineCap='round'
                              lineJoin='round'
                              strokeColor="rgba(255,140,0,0.8)"/>

                        }
                    </MapView>
                }
                <View style={styles.search}>
                    <SearchBar
                        lightTheme
                        round
                        placeholder='Type Here...' />
                </View>
                {directions && Object.keys(markerSelected).length>0 &&
                  <View style={styles.touchable}>
                    <TouchableOpacity
                      onPress={this.onDirectionPress}>
                      <View >
                        {directionPressed ? <Text>Cancel Navigation</Text> : <Text>To The Bar!</Text>}
                      </View>
                    </TouchableOpacity>
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
        width: width,
        marginTop: 20
    },
    touchable: {
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        width: 200,
        height: 80,
        padding: 20,
        borderRadius: 10
    }
})

const mapState = ({ bars, directions }) => {
    return { bars, directions };
};

const mapDispatch = (dispatch) => {
    return {
        fetchBarsFromServer: () => {
            dispatch(fetchBarsFromServer());
        },
        getDirections: (marker, currentLocation) => {
          let dest = {latitude: marker.lat, longitude: marker.lon}
          console.log('current', currentLocation, 'dest', dest);
          dispatch(getDirectionsToBar(currentLocation, dest))
        }
    }
}

export default connect(mapState, mapDispatch)(GenreMap);
