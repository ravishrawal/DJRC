import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { List, ListItem, Separator } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import getDirections from 'react-native-google-maps-directions';
import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';
import SearchBar from './SearchBar.js'
const Icons = require('../../assets/Icons/tile');


export default function BarList(props){
  function renderRow(bar){
    if(bar.songs) console.log(bar.songs);
    let swipeoutBtns = [
      {
        text: 'Go',
        backgroundColor: colors.gray,
        onPress: ()=>{
          const data = {
            destination: { latitude: bar.lat, longitude: bar.lon },
            params: [
              {
                key: "dirflg",
                value: "w"
              }
            ]
          }
          getDirections(data);
        }
      }
    ]
    const icon = Icons[ bar.genreNames[0].replace(/\s+/,"").replace('70\'s', 'Seventies').replace('80\'s', 'Eighties').replace('90\'s', 'Nineties')]
    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose={true}
        >
        <TouchableHighlight
          onPress={ ()=>navigate('SampleProfile', { bar }) } >
            <View style={styles.row}>
              <View style={styles.textSection}>
                <Text style={styles.barNameText}> {bar.name} </Text>
                {bar.songs && bar.songs.splice(0,3).map((song, index)=> {
                  const firstSong = index === 0;
                  return (
                      <View key={song.song}>
                        { firstSong && <Text style={styles.barSongsText}>Currently Playing:</Text>}
                        <Text key ={song.song} style={styles.barSongsText}>{song.song} | {song.artist}</Text>
                      </View>
                    )
                  })
                }
              </View>
              <View style={styles.iconSection}>
                <Image source={icon} />
              </View>
            </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  const { bars, navigate } = props;
  return (
    <View>
      <SearchBar />
      <ScrollView>
        { bars.length <= 0 ? <Text>No Bars To Show</Text> :
            <List>
              {
                bars.map(bar => {
                  return (
                    <View key={bar.id}>
                      {renderRow(bar)}
                    </View>
                  )
                })
              }
            </List>
        }
      </ScrollView>
    </View>
  )
}

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.blue,
    width: width,
    borderWidth:1,
    borderColor:colors.gray,
    flexDirection: 'row',
    flex: 1
  },
  barNameText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.yellowLight
  },
  barSongsText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.offWhite,
    marginLeft: 4
  },
  textSection: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 0.8*width
  },
  iconSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
    padding: 10
  }
});
