import React from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let { width, height } = Dimensions.get('window')


export default class SearchBars extends React.Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Search"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width / 1.1,
        justifyContent: 'flex-end'
    },
    icon: {
        fontSize: 25
    }
})
