import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import t from 'tcomb-form-native';

import { postReviewToServer } from '../redux/reviews';
var _ = require('lodash');

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.fieldset = {
    flexDirection: 'row'
};
// stylesheet.formGroup.normal.flex = fl;
// // stylesheet.formGroup.error.flex = 1;

const Form = t.form.Form;

//require's string for prop,  converts '1' into number


class Review extends React.Component {
    constructor() {
        super();
        this.state = {
            Rating: '',
            Review: '',
            Genre: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(value) {
        this.setState(value);
    }

    handleSubmit() {
        const { bar } = this.props;
        console.log(this.state)
        this.props.postReviewToServer(this.state, bar.id, this.props.user.id);
        this.props._hideModal();
    }

    render() {

        const Ratings = t.enums({ "1": "1", "2": "2", "3": "3", "4": "4", "5": "5" })

        const Genres = this.props.genres.reduce((memo, next) => {
            memo[next.name] = next.name
            return memo;
        }, {})

        const GenreEnums = t.enums(Genres)


        const ReviewForm = t.struct({
            Rating: Ratings,
            Genre: GenreEnums,
            Review: t.String,
        })

        const options = {
            fields: {
                Rating: {
                    stylesheet: stylesheet
                },
                Genres: {
                    stylesheet: stylesheet
                }
            }
        }
        return (
            <View style={styles.container}>
                <Form
                    type={ReviewForm}
                    onChange={this.onChange}
                    options={options}
                    value={this.state}
                />
                <Button
                    title="Leave Review"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});


const mapState = ({ genres, user }) => {
    return { genres, user };
};

const mapDispatch = (dispatch) => {
    return {
        postReviewToServer: (review, barId, userId) => {
            dispatch(postReviewToServer(review, barId, userId))
        }
    }
};

export default connect(mapState, mapDispatch)(Review);
