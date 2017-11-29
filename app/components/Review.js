import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

class Review extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                {genres.length > 0 && genres.map((genre) => {
                    return (
                        <View
                            key={genre.key}
                            style={styles.buttonStyle}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigate('Map', { genre: genre.key, selectedGenreName: genre.name })
                                }
                            >
                                <Image style={{ alignSelf: 'center' }} source={Icons[genre.name.replace(/\s+/, "")]} />
                                <Text style={styles.genreText}>{genre.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#f7f7f7',
        marginTop: 50
    },
    buttonStyle: {
        width: (width - 20) / 2,
        height: (height - 150) / 5,
        backgroundColor: '#ff4554',
        margin: 5,
        borderWidth: 3,
        borderColor: '#00c3e3',
        borderRadius: 2,
        justifyContent: 'center'
    },
    genreText: {
        alignSelf: 'center',
        fontFamily: 'zilla-slab-regular',
        fontSize: 20,
        color: '#f7f7f7',
    }
});


const mapState = ({ }) => {
    return {};
};

const mapDispatch = (dispatch) => {
    return {
    };
};

export default connect(mapState, mapDispatch)(Review);
