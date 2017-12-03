import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { List, ListItem, Separator } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import getDirections from 'react-native-google-maps-directions';
const Icons = require('../../assets/Icons/tile');


export default function BarList(props){
  function renderRow(bar){
    if(bar.songs) console.log(bar.songs);
    let swipeoutBtns = [
      {
        text: 'Go',
        backgroundColor: '#ff4554',
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
    const icon = Icons[ bar.genreNames[0].replace(/\s+/,"")]
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
                <Image style= {styles.iconStyle} source={icon} />
              </View>
            </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  const { bars, navigate } = props;
  return (
    <ScrollView>
      <List>
        {
          bars.map(bar => {
            return (
              <View key={bar.id} >
                {renderRow(bar)}
              </View>
            )
          })
        }
      </List>
    </ScrollView>
  )
}

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#ff4554',
    width: width,
    borderWidth:2,
    borderColor:'black',
    flexDirection: 'row'
  },
  barNameText: {
    fontFamily: 'zilla-slab-bold',
    fontSize: 20,
    color: '#f7f7f7'
  },
  barSongsText: {
    fontFamily: 'zilla-slab-regular',
    fontSize: 16,
    color: '#f7f7f7'
  },
  iconSection: {
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
})
