import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';



class Button extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { customStyle, buttonText, onButtonPress } = this.props;

        return(<TouchableOpacity onPress={onButtonPress} style={[{ backgroundColor: '#09C2FF', color: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }, customStyle]}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>{buttonText}</Text>
        </TouchableOpacity>);
    }
};

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