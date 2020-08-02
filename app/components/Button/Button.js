import React, { Component } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import AppStyles from '../../config/styles';

class Button extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { customStyle, buttonText, onButtonPress, isLoading } = this.props;

        return(
            <TouchableOpacity onPress={onButtonPress} style={[ styles.button, customStyle]} disabled={isLoading}>
                {
                    isLoading
                        ?   <ActivityIndicator size="small" color={AppStyles.colors.WHITE} />
                        :   <Text style={styles.buttonText}>{buttonText}</Text>
                }
            </TouchableOpacity>);
    }
}

Button.proptypes = {
    buttonText: PropTypes.string,
    customStyle: PropTypes.shape(),
    onButtonPress: PropTypes.func,
    isLoading: PropTypes.bool
};

Button.defaultProps = {
    buttonText: '',
    customStyle: {},
    isLoading: false,
    onButtonPress: () => {}
};
export default Button;