import React, { Component } from 'react';
import { View, TextInput, Image, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import publicIP from 'react-native-public-ip';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import { getPhoneNumberWithCountryCode } from '../../utils';
import styles from './styles';
import images from '../../config/images';


class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state={
            phoneNumber: '',
            isLoading: false
        };
    }
    _initiateGenerateOtpFlow = async() => {
        const response = await this.props.generateOtp(this.state.phoneNumber);
        response.errorCode
            ? Alert.alert('Error', response.errorDescription || response.response)
            : this.props.showOtpScreen({ mVerificationId: response.mVerificationId });
        this.setState({ isLoading: false });
    }

    callGetUserInfo = async (correlationId, pollingTime) => new Promise((res,reject) => {
        setTimeout( async() => {
            try{
                const userInfo = await this.props.getUserInfo(correlationId);
                res(userInfo);
            }catch(err){
                reject(err);
            }
        }, pollingTime);
    })

    _getUserInfo = async(correlationId) => {
        let userInfo;
        let pollingTime = 0;
        let currentDate =  new Date();
        let retry = false;
        do {
            retry = false;
            try{
                userInfo = await this.callGetUserInfo(correlationId, pollingTime);
            }
            catch(err){
                retry = true;
            }
            if(pollingTime === 0) pollingTime = 100;
        }while(((userInfo && userInfo.status === '') || retry === true) && (new Date()).getTime() - currentDate.getTime() < 3000);
        if(retry === true)
            return null;
        return userInfo;
    }

    _handleLoginClick = async () => {
        this.setState({ isLoading: true });
        const correlationId = uuid();
        const userIp = await publicIP();
        const authInitiateResponse = await this.props.authInitiate(userIp, getPhoneNumberWithCountryCode('india', this.state.phoneNumber), correlationId);
        const authFinalizeResponse = await this.props.authFinalize(correlationId);
        const userInfo = await this._getUserInfo(correlationId);
        if(userInfo && userInfo.mobileNumber && userInfo.mobileNumber === getPhoneNumberWithCountryCode('india', this.state.phoneNumber)){
            this.props.showLoginSuccessfulScreen();
            this.setState({ isLoading: false });
            return;
        }
        this._initiateGenerateOtpFlow();
    }

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
                                        editable={!(this.state.isLoading)}
                                    />
                                </View>
                            </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonText={'LOGIN'}
                            isLoading={this.state.isLoading}
                            customStyle={styles.button}
                            onButtonPress={this._handleLoginClick}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

LoginView.propTypes = {
    authDiscover: PropTypes.func,
    authInitiate: PropTypes.func,
    authFinalize: PropTypes.func,
    getUserInfo: PropTypes.func,
    showLoginSuccessfulScreen: PropTypes.func,
    showOtpScreen: PropTypes.func,
    generateOtp: PropTypes.func
};

export default LoginView;
