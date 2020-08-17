import React, { Component } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import styles from './styles';
import images from '../../config/images';

class OtpVerificationView extends Component {
    constructor(props) {
        super(props);
        this.state={
            otp: '',
            isOtpFilled: false,
            mVerificationId: ''
        };
    }
    async componentDidMount(){
        this.setListenerForOtp();
        const generateOtpResponse = await this.props.generateOtp(this.props.navigation.getParam('phoneNumber'), this.props.navigation.getParam('country'));
        if((!generateOtpResponse) ||  generateOtpResponse.errorCode)
            Alert.alert('Error', (generateOtpResponse && (generateOtpResponse.errorDescription || generateOtpResponse.response)) || 'Not able to use mobile data');
        else
            this.setState({ mVerificationId: generateOtpResponse.mVerificationId });
    }

    componentWillUnmount(){
        RNOtpVerify.removeListener();
    }
    setListenerForOtp = () =>
        RNOtpVerify.getOtp()
            .then(p => RNOtpVerify.addListener(this.otpHandler))
            .catch(p => { /*todo*/ });

    otpHandler = (message) => {
        try{
            const otp = /(\d{6})/g.exec(message)[1];
            this.setState({ otp, isOtpFilled: true });
            RNOtpVerify.removeListener();
            this._handleOtpVerification();
        }
        catch(err){
            //handleError
        }
    };
    _handleOtpVerification = async () => {
        const verificationResponse = await this.props.verifyOtp(this.state.otp, this.state.mVerificationId);
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
                                    code={this.state.otp}
                                    pinCount={6}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.otp}
                                    codeInputHighlightStyle={styles.otp}
                                    onCodeChanged={onChangeOtp}
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
    showLoginSuccessfulScreen: PropTypes.func,
    generateOtp: PropTypes.func
};

export default OtpVerificationView;
