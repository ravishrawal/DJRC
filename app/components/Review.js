import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {Button} from 'react-native-elements';
import t from 'tcomb-form-native';

import { postReviewToServer } from '../store/reviews';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';

var _ = require('lodash');

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.fieldset = {
    flexDirection: 'row'
};
const Form = t.form.Form;

class Review extends React.Component {
    constructor() {
        super();
        this.state = {
            Rating: '',
            Review: '',
            Genre: '',
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        const { bar, location, navigate } = this.props;
        Promise.all([this.props.postReviewToServer(this.state, bar.id, this.props.user.id, location)])
            .then(() => {
                this.props._hideModal();
                navigate.goBack();
            });
    }
    onChange(value) {
        this.setState(value);
    }
    render() {
        const Ratings = t.enums({ "1": "1", "2": "2", "3": "3", "4": "4", "5": "5" });
        const Genres = this.props.genres.reduce((memo, next) => {
            memo[next.name] = next.name;
            return memo;
        }, {});
        const GenreEnums = t.enums(Genres);
        const ReviewForm = t.struct({
            Rating: Ratings,
            Genre: GenreEnums,
            Review: t.String,
        });
        const options = {
            fields: {
                Rating: {
                    stylesheet: stylesheet
                },
                Genres: {
                    stylesheet: stylesheet
                }
            }
        };

        return (
            <View style={styles.container}>
                <Form
                    onChange={this.onChange}
                    options={options}
                    type={ReviewForm}
                    value={this.state} />
                <View style={{alignItems: 'center'}}>
                    <Button
                        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        onPress={this.handleSubmit}
                        title="Leave Review" />
                </View>
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
        width: 200,
    },
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    text: {
        color: colors.blue,
        fontFamily: fonts.regular,
        fontSize: 20,
    }
});


const mapState = ({ genres, user, location }) => {
    return { genres, user, location };
};

const mapDispatch = (dispatch) => {
    return {
        postReviewToServer: (review, barId, userId, location) => {
            dispatch(postReviewToServer(review, barId, userId, location));
        }
    };
};

export default connect(mapState, mapDispatch)(Review);
