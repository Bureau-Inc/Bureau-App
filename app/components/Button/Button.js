import React, { Component } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import AppStyles from '../../config/styles';

class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: this.props.isLoading,
            isDisabled: this.props.isDisabled
        };
    }
    render() {
        const { customStyle, buttonText, onButtonPress, isLoading, isDisabled } = this.props;
        return(
            <TouchableOpacity
                onPress={onButtonPress}
                style={[ styles.button, customStyle, (isLoading || isDisabled) && styles.disabledButton ]}
                disabled={isLoading || isDisabled}
                activeOpacity={0.7}
            >
                {
                    isLoading
                        ?   <ActivityIndicator size="small" color={AppStyles.colors.WHITE} />
                        :   <Text style={styles.buttonText}>{buttonText}</Text>
                }
            </TouchableOpacity>);
    }
}

Button.propTypes = {
    buttonText: PropTypes.string,
    customStyle: PropTypes.shape(),
    onButtonPress: PropTypes.func,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool
};

Button.defaultProps = {
    buttonText: '',
    customStyle: {},
    isLoading: false,
    isDisabled: false,
    onButtonPress: () => {}
};
export default Button;