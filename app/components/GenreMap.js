import React from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { SearchBar } from 'react-native-elements'
let { width, height } = Dimensions.get('window')

import SearchBars from './SearchBars';

export default class GenreMap extends React.Component {


    render() {
        const coordinate = {
            latitude: 37.78825,
            longitude: -122.4324,
        };
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>

                    <MapView.Marker
                        coordinate={coordinate}
                        title='Airbnb'
                    />
                </MapView>

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
