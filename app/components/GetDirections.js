import getDirections from 'react-native-google-maps-directions';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import colors from '../helper/colors.js';
import commonStyles from '../helper/styles.js';
import fonts from '../helper/fonts.js';

export default class gmapsDirections extends Component {
    constructor(props) {
        super(props);
        this.handleGetDirections = this.handleGetDirections.bind(this);
    }
    handleGetDirections() {
        const data = {
            destination: this.props.barLocation,
            params: [{
                key: 'dirflg',
                value: 'w'
            }]
        };
        getDirections(data);
    }
    render() {
        return (
            <View>
                <Button
                    buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                    fontFamily={fonts.bold}
                    onPress={this.handleGetDirections}
                    title="Get Directions" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        marginBottom: 0,
        width: 200,
    },
});
