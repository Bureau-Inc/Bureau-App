import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class Button extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { customStyle, buttonText, onButtonPress } = this.props;

        return(<TouchableOpacity onPress={onButtonPress} style={[ styles.button, customStyle]}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>);
    }
}

Button.propTypes = {
    buttonText: PropTypes.string,
    customStyle: PropTypes.shape(),
    onButtonPress: PropTypes.func
};

Button.defaultProps = {
    buttonText: '',
    customStyle: {},
    onButtonPress: () => {}
};
export default Button;