import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { FlatList, ListItem } from 'react-native-elements';
const Icons = require('./Icons');

export default function BarList(props){
  const { bars } = props
  return (
    <View>
      <FlatList
        data={bars}
        renderItem={(item) => <ListItem title={item.title} />}
      />
    </View>
  )
}
