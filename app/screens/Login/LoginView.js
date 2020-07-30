import React, { Component } from 'react';
import { View, TextInput, Image, Text, Alert } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import styles from './styles';
import images from '../../config/images';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state={
            phoneNumber: '8848062056',
            isLoading: this.props.isLoginProcessing,
            startInitiateCycle: false,
            startFinalizeFlow: false,
        };
    }

    _handleLoginClick = async () => {
        const userIp = await NetworkInfo.getIPAddress();
        const response =  await this.props.authDiscover(userIp);
        if(response && response.supported){
            const authInitiateResponse = await this.props.authInitiate(userIp, `91${this.state.phoneNumber}`, response.correlationId);
            const authFinalizeResponse = await this.props.authFinalize(response.correlationId);
            const userInfo = await this.props.getUserInfo(response.correlationId);
            //console.log(userInfo, authFinalizeResponse, authInitiateResponse);
            if(userInfo.mobileNumber === `91${this.state.phoneNumber}`){
                this.props.showLoginSuccessfulScreen();
            }
            else {
                Alert.alert('Error!', 'User Authentication Failed');
            }
        }
        else{
            //INITIATE OTP CALL
            Alert.alert('Authentication REquired!', 'Initiating OTP Call');
        }
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
    isLoginProcessing: PropTypes.bool,
    authDiscover: PropTypes.func,
    authInitiate: PropTypes.func,
    authFinalize: PropTypes.func,
    getUserInfo: PropTypes.func,
    showLoginSuccessfulScreen: PropTypes.func
};

export default LoginView;
