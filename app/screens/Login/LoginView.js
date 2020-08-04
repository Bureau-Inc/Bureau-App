import React, { Component } from 'react';
import { View, TextInput, Image, Text, Alert } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import { getPhoneNumberWithCountryCode, sleep } from '../../utils';
import styles from './styles';
import images from '../../config/images';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state={
            phoneNumber: '8848062056',
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

    _getUserInfo = async (correlationId) => {
        let userInfo;
        let count = 0;

        do {
            await sleep(3000);
            userInfo = await this.props.getUserInfo(correlationId);
            count = count + 1;
        } while(userInfo && userInfo.status === '' && count < 5);
        return userInfo;
    }
    

    _handleLoginClick = async () => {
        const userIp = await NetworkInfo.getIPAddress();
        this.setState({ isLoading: true });
        const response =  await this.props.authDiscover(userIp);
        if(response && response.supported){
            const authInitiateResponse = await this.props.authInitiate(userIp, getPhoneNumberWithCountryCode('india', this.state.phoneNumber), response.correlationId);
            const authFinalizeResponse = await this.props.authFinalize(response.correlationId);
            // let userInfo;
            // let count = 0;

            // do {
            //     await sleep(3000);
            //     userInfo = await this.props.getUserInfo(response.correlationId);
            //     count = count + 1;
            // } while(userInfo && userInfo.status === '' && count < 5);

            const userInfo = await this._getUserInfo(response.correlationId);

            if(userInfo && userInfo.mobileNumber && userInfo.mobileNumber === getPhoneNumberWithCountryCode('india', this.state.phoneNumber)){
                this.props.showLoginSuccessfulScreen();
                this.setState({ isLoading: false });
                return;
            }
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
