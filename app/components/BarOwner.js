import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Card, ListItem, List, FormLabel, FormInput, Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';

import { logoutUser } from '../store/user';
import { updateGenres, addPromo } from '../store/bars';
import { fetchGenres } from '../store/genres';
import { fetchPromos, deletePromo } from '../store/promos';

import colors from '../helper/colors.js';
import commonStyles from '../helper/styles.js';
import fonts from '../helper/fonts.js';

const Form = t.form.Form;
let { height, width } = Dimensions.get('window');

class BarOwner extends Component {
    constructor() {
        super();
        this.state = {
            formVisible: false,
            genreArr: [1],
            promoText: '',
            Genre: []
        };
        this.logout = this.logout.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
        this.submitGenreUpdate = this.submitGenreUpdate.bind(this);
        this.changePromo = this.changePromo.bind(this);
        this.submitPromo = this.submitPromo.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.removePromo = this.removePromo.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchGenres();
    }
    changePromo(promoText) {
        this.setState({ promoText: promoText });
    }
    logout() {
        const { navigate } = this.props.navigation;
        this.props.logoutUser(navigate);
    }
    onChange(value) {
        this.setState({Genre: [value.Genre]});
    }
    removePromo(promoId) {
        this.props.deletePromo(promoId);
    }
    submitGenreUpdate() {
        this.props.updateGenres(this.props.owner.id, this.state.Genre);
    }
    submitPromo() {
        this.props.addPromo(this.props.owner.id, this.state.promoText);
        this.setState({
            promoText: ''
        });
        this.toggleForm();
        this.props.fetchPromos(this.props.owner.id);
        alert('Promo added!');
    }
    toggleForm() {
        this.setState({
            formVisible: !this.state.formVisible
        });
    }
    updateGenre(genre) {
        let newGenres = [this.state.genreArr[0]];
        newGenres[0] = genre;
        this.setState({
            genreArr: newGenres
        });
    }
    render() {
        const { submitGenreUpdate, changePromo, submitPromo, toggleForm } = this;
        const genres = this.state.genreArr;
        const Genres = this.props.genres.reduce((memo, next) => {
            memo[next.key] = next.name;
            return memo;
        }, {});
        const GenreEnums = t.enums(Genres);
        const GenreForm = t.struct({
            Genre: GenreEnums,
        });
        let options = {
            auto: 'none'
        };

        function renderRow(promo) {
            const swipeBtns = [{
                backgroundColor: 'red',
                text: 'Delete',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { deletePromo(promo.id) }
            }];
            return (
                <Swipeout
                    autoclose="true"
                    backgroundColor="transparent"
                    right={swipeBtns}>
                    <ListItem
                        key={promo.id}
                        title={promo.description}
                        titleStyle={[styles.text, { alignSelf: 'center' }]}
                        roundAvatar />
                </Swipeout>
            );
        }

        return (
            <View style={styles.container}>
                {
                    this.state.formVisible ?
                        <View style={styles.form}>
                            <FormLabel>Promo Description</FormLabel>
                            <FormInput
                                onChangeText={changePromo} />
                            <Button
                                buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                fontFamily={fonts.bold}
                                onPress={() => submitPromo()}
                                title="Save Promo" />
                            <Button
                                buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                fontFamily={fonts.bold}
                                onPress={() => toggleForm()}
                                title="Go Back" />
                        </View>
                    :
                        <Card
                            containerStyle={styles.card}
                            fontFamily={fonts.regular}
                            title={this.props.owner.name}
                            titleStyle={{ fontSize: 20 }}>
                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={styles.text}>Update Your Genre</Text>
                            </View>
                            <View>
                                <Form
                                    onChange={this.onChange}
                                    options={options}
                                    type={GenreForm}
                                    value={this.state} />
                            </View>
                            <Button
                                buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                fontFamily={fonts.bold}
                                onPress={submitGenreUpdate}
                                title="Submit Genre Changes" />
                            <Button
                                buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                fontFamily={fonts.bold}
                                onPress={() => toggleForm()}
                                title="Add Promo!" />
                            <Text style={[styles.text, { marginTop: 10 }]}>Current Promos</Text>
                            <View>
                                <List
                                    containerStyle={{ marginBottom: 10 }}>
                                    {
                                        this.props.owner.promos && this.props.owner.promos.length ? this.props.owner.promos.map((promo) => (
                                            <View key={promo.id}>
                                                {renderRow(promo)}
                                            </View>
                                        )) :
                                        <Text></Text>
                                    }
                                </List>
                            </View>
                            <Button
                                buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                                fontFamily={fonts.bold}
                                onPress={this.logout}
                                title="Logout" />
                        </Card>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    border: {
        borderColor: '#d6d7da',
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        width: 200,
    },
    card: {
        alignItems: 'center',
        width: width,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        marginTop: 20,
        width: width,
    },
    form: {
        alignItems: 'center',
        width: width,
    },
    greenButton: {
        backgroundColor: '#4CD964',
        marginTop: 20,
    },
    text: {
        color: colors.blue,
        fontFamily: fonts.regular,
        fontSize: 20,
    },
});

const mapState = ({ genres, user, owner, promos }) => {
    return {
        user,
        genres,
        owner,
        promos
    };
};

const mapDispatch = (dispatch) => {
    return {
        logoutUser: (navigate) => {
            dispatch(logoutUser(navigate));
        },
        fetchGenres: () => {
            dispatch(fetchGenres());
        },
        fetchPromos: (venueId) => {
            dispatch(fetchPromos(venueId));
        },
        updateGenres,
        addPromo,
        deletePromo
    };
};

export default connect(mapState, mapDispatch)(BarOwner);
