import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

import {fetchGenres} from '../store/genres';
import {tokenUser} from '../store/user';

import colors from '../helper/colors.js';
import commonStyles from '../helper/styles.js';
import fonts from '../helper/fonts.js';

const Icons = require('../../assets/Icons/tile');
let { height, width } = Dimensions.get('window');

class GenreTiles extends React.Component {
    componentDidMount(){
        this.props.fetchGenres();
        this.props.fetchUser();
    }
    render() {
        const genres = this.props.genres.length && this.props.genres;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                {
                    genres.length > 0 && genres.map((genre) => {
                        return (
                            <View
                                key={genre.key}
                                style = {[styles.buttonStyle, commonStyles.shadow, commonStyles.roundedCorners]}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigate('Map', { genre: genre.key, selectedGenreName: genre.name })
                                    }>
                                    <Image style={{ alignSelf: 'center' }} source={ Icons[genre.name.replace(/\s+/, '').replace('70\'s', 'Seventies').replace('80\'s', 'Eighties').replace('90\'s', 'Nineties')] } />
                                    <Text style = {styles.genreText}>{genre.name}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
    },
    buttonStyle: {
        backgroundColor: colors.redOrangeDark,
        borderColor: colors.redOrangeDark,
        height: (height - 150) / 5,
        justifyContent: 'center',
        margin: 5,
        width: (width - 20) / 2,
    },
    genreText: {
        alignSelf: 'center',
        color: colors.offWhite,
        fontFamily: fonts.bold,
        fontSize: 20,
    },
});


const mapState = ({ genres }) => {
    return { genres };
};

const mapDispatch = (dispatch) => {
    return {
        fetchGenres: () => {
            dispatch(fetchGenres());
        },
        fetchUser: () => {
          dispatch(tokenUser());
        },
    };
};

export default connect(mapState, mapDispatch)(GenreTiles);
