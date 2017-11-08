import React from 'react';
import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native';
import Polyline from '@mapbox/polyline';
import { MapView } from 'expo';
import { SearchBar } from 'react-native-elements'
let { width, height } = Dimensions.get('window')

export default class GenreMap extends React.Component {
    constructor(){
      super()
      this.state = {
        currentLocation: {},
        regionSize: {
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        },
        destLocation: {
          latitude: 40.72581151,
          longitude: -73.98489475
        }
      };
      this.onRegionChange = this.onRegionChange.bind(this)

    }
    componentDidMount(){
      navigator.geolocation.getCurrentPosition((res, rej)=>{
        res ? this.setState({currentLocation: {latitude: res.coords.latitude, longitude: res.coords.longitude} }) : console.log(rej);
        console.log(res.coords);
      })
      setTimeout(()=>this.getDirections().then(()=>console.log('state set')),2000);
    }
    onRegionChange(region){
      let { latitude, longitude, latitudeDelta, longitudeDelta } = region;
      this.setState({ currentLocation: { latitude, longitude }, regionSize: { latitudeDelta, longitudeDelta} })
    }
    async getDirections(startLoc=this.state.currentLocation, destinationLoc=this.state.destLocation) {
      console.log(startLoc, destinationLoc);
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc.latitude },${startLoc.longitude}&destination=${ destinationLoc.latitude },${destinationLoc.longitude}&mode=walking`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude :point[0],
                    longitude :point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }
    render() {
        let {currentLocation, regionSize, destLocation, coords} = this.state;
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

                    <MapView.Marker
                        coordinate={coordinate}
                        title='Airbnb'
                    />
                  {coords &&
                    <MapView.Polyline
                      coordinates={coords}
                      strokeWidth={4}
                      lineCap='round'
                      lineJoin='round'
                      strokeColor="rgba(255,140,0,0.8)"/>}
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
