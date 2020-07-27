import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class OtpScreenView extends Component {
    navigate = () => {
        this.props.onLogin('username', 'password');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TouchableOpacity onPress={this.navigate}>
                    <Text>Go to Home</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

OtpScreenView.propTypes = {
    onLogin: PropTypes.func
};

export default OtpScreenView;
