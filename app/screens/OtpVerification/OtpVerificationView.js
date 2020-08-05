import React, { Component } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import styles from './styles';
import images from '../../config/images';

class OtpVerificationView extends Component {
    constructor(props) {
        super(props);
        this.state={
            otp: '',
            isOtpFilled: false
        };
    }
    _handleOtpVerification = async () => {
        const verificationResponse = await this.props.verifyOtp(this.state.otp, this.props.navigation.getParam('mVerificationId'));
        (verificationResponse.errorCode || !(verificationResponse.verification))
            ? Alert.alert('Error', (verificationResponse.response || verificationResponse.errorDescription))
            : this.props.showLoginSuccessfulScreen();
    };

    render() {
        const onChangeOtp = (otp) => {
            this.setState({ otp, isOtpFilled: true });
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
                                    Verification Code
                                </Text>
                            </View>
                            <View style={styles.phoneNumberContainer}>
                                <OTPInputView
                                    pinCount={6}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.otp}
                                    codeInputHighlightStyle={styles.otp}
                                    onCodeFilled={onChangeOtp}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                            Please enter the 6 digit OTP sent to your mobile
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonText={'VERIFY'}
                            customStyle={styles.button}
                            isDisabled={!(this.state.isOtpFilled)}
                            onButtonPress={this._handleOtpVerification}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

OtpVerificationView.propTypes = {
    navigation: PropTypes.any,
    verifyOtp: PropTypes.func,
    showLoginSuccessfulScreen: PropTypes.func
};

export default OtpVerificationView;
