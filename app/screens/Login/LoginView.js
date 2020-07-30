import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import styles from './styles';
import images from '../../config/images';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state={
            phoneNumber: ''
        };
    }
    navigate = () => {};

    render() {
        const onChangeText = (updatedPhoneNumber) => {
            this.setState({
                phoneNumber: updatedPhoneNumber.replace(/[^0-9]/g, '')
            });
        }; 
        return (
            <View style={styles.container}>
                <BlueContainer style={styles.curveContainer} />
                <View style={styles.absoluteContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={images.icons.logo_blue}
                                resizeMode={'contain'}
                                style={styles.logo}
                            />
                        </View>
                        <View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Enter your mobile no to continue
                                </Text>
                            </View>
                            <View style={styles.phoneNumberContainer}>
                                <View style={styles.phoneNumberPrefixContainer}>
                                    <TextInput
                                        editable={false}
                                        value={'+91'} 
                                        style={styles.phoneNumber}
                                    />
                                </View>
                                <View style={styles.phoneNumberInputContainer}>
                                    <TextInput
                                        maxLength={10}
                                        dataDetectorTypes={'phoneNumber'}
                                        keyboardType={'numeric'}
                                        style={styles.phoneNumber}
                                        onChangeText={onChangeText}
                                        value={this.state.phoneNumber}
                                    />
                                </View>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                            A 4 digit OTP will be sent as an SMS to verify your mobile number
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonText={'LOGIN'}
                            customStyle={styles.button}
                            onButtonPress={()=>{}}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

LoginView.propTypes = {
    onLogin: PropTypes.func
};

export default LoginView;
