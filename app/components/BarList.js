import React from 'react';
// import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { List } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import getDirections from 'react-native-google-maps-directions';

import colors from '../helper/colors.js';
// import commonStyles from '../helper/styles.js';
import fonts from '../helper/fonts.js';

const Icons = require('../../assets/Icons/tile');

export default function BarList(props) {

    function renderRow(bar) {
        if (bar.songs) console.log(bar.songs);
        let swipeoutBtns = [{
            backgroundColor: colors.gray,
            text: 'Go',
            onPress: () => {
                const data = {
                    destination: { latitude: bar.lat, longitude: bar.lon },
                    params: [{
                        key: 'dirflg',
                        value: 'w'
                    }]
                };
                getDirections(data);
            }
        }];
        const icon = Icons[bar.genreNames[0].replace(/\s+/,'').replace('70\'s', 'Seventies').replace('80\'s', 'Eighties').replace('90\'s', 'Nineties')];

        return (
            <Swipeout
                autoClose={true}
                right={swipeoutBtns}>
                <TouchableHighlight
                    onPress={() => navigate('SampleProfile', { bar })}>
                    <View style={styles.row}>
                        <View style={styles.textSection}>
                            <Text style={styles.barNameText}>{bar.name}</Text>
                            {
                                bar.songs && bar.songs.splice(0, 3).map((song, index) => {
                                    const firstSong = index === 0;
                                    return (
                                        <View key={song.song}>
                                            { firstSong && <Text style={styles.barSongsText}>Currently Playing:</Text>}
                                            <Text key ={song.song} style={styles.barSongsText}>{song.song} | {song.artist}</Text>
                                        </View>
                                    );
                                })
                            }
                        </View>
                        <View style={styles.iconSection}>
                            <Image source={icon} />
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        );
    }

    const { bars, navigate } = props;

    return (
        <ScrollView>
            {
                bars.length <= 0 ? <Text>No Bars To Show</Text> :
                    <List>
                        {
                            bars.map(bar => {
                                return (
                                    <View key={bar.id}>
                                        {renderRow(bar)}
                                    </View>
                                );
                            })
                        }
                    </List>
            }
        </ScrollView>
    );
}

let { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    row: {
        backgroundColor: colors.blue,
        borderColor: colors.gray,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        width: width,
    },
    barNameText: {
        color: colors.yellowLight,
        fontFamily: fonts.bold,
        fontSize: 20,
    },
    barSongsText: {
        color: colors.offWhite,
        fontFamily: fonts.bold,
        fontSize: 16,
        marginLeft: 4,
    },
    textSection: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 0.8*width,
    },
    iconSection: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 10,
        padding: 10,
    }
});
