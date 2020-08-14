import React, { Component } from 'react';
import { View, TextInput, Image, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import 'react-native-get-random-values';
import DropDownPicker from 'react-native-dropdown-picker';
import { v4 as uuid } from 'uuid';

import { Button } from '../../components';
import { BlueContainer } from '../../config/svgs';
import { getPhoneNumberWithCountryCode, getCountrylabels } from '../../utils';
import styles from './styles';
import images from '../../config/images';
import NetworkModule from '../../utils/network-module/network-module';


class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state={
            phoneNumber: '',
            isLoading: false,
            countryCodeLabels: getCountrylabels(),
            selectedCountryCode: getCountrylabels()[0],
            correlationId: '',
            authInitiateResponse: '',
            userInfo: ''
        };
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

    _handleAuthFlow = async (correlationId) => {
        try {
            const url2 = `https://api.bureau.id/v2/auth/finalize?clientId=d124b98e-c8b8-4d5c-8210-7b59ebc2f7fd&correlationId=${correlationId}`;
            return await NetworkModule.get(url2);
        }
        catch(err){
            return null;
        }
    }

    _handleLoginClick = async () => {
        this.setState({ isLoading: true });
        const correlationId = uuid();
        this.setState({ correlationId });
        try {
            // authINitiate Call
            const url1 = `https://api.bureau.id/v2/auth/initiate?clientId=d124b98e-c8b8-4d5c-8210-7b59ebc2f7fd&callbackUrl=https://s790uxck71.execute-api.ap-south-1.amazonaws.com/prd/callback&countryCode=IN&msisdn=91${this.state.phoneNumber}&correlationId=${correlationId}`;
            const authInitiateResponse = await NetworkModule.get(url1);
            this.setState({ authInitiateResponse });

            //authFinalizecall
            const authfinalizeresponse = this._handleAuthFlow(correlationId);
            
            const userInfo = await this._getUserInfo(correlationId);
            this.setState({ userInfo });
            
            if(userInfo && userInfo.mobileNumber && userInfo.mobileNumber === getPhoneNumberWithCountryCode(this.state.selectedCountryCode.value, this.state.phoneNumber)){
                this.props.showLoginSuccessfulScreen();
                this.setState({ isLoading: false });
                return;
            }
            this.setState({ isLoading: false });
            this.props.showOtpScreen({ phoneNumber: this.state.phoneNumber, country: this.state.selectedCountryCode.label });
        } catch(error) {
            this.setState({ isLoading: false });
            error.message === 'timeout'
                ?   Alert.alert('Error', 'Not able to use mobile data')
                :   Alert.alert('Error', error.message);
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
                            <View style={styles.inputContainer}>
                                <DropDownPicker
                                    items={this.state.countryCodeLabels}
                                    containerStyle={styles.dropDownContainer}
                                    labelStyle={styles.dropDownLabel}
                                    defaultValue={this.state.selectedCountryCode.value}
                                    itemStyle= {styles.dropDownItem}
                                    style= {styles.dropDownItem}
                                    selectedLabelStyle={styles.dropDownItem}
                                    showArrow={false}
                                    onChangeItem = { item => this.setState({selectedCountryCode: item})}
                                />
                                <View style={styles.phoneNumberContainer}>
                                    <View style={styles.phoneNumberPrefixContainer}>
                                        <TextInput
                                            editable={false}
                                            value={`+${this.state.selectedCountryCode.value}`} 
                                            style={styles.phoneNumber}
                                        />
                                    </View> 
                                    <View style={styles.phoneNumberInputContainer}>
                                        <TextInput
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
    showOtpScreen: PropTypes.func
};

export default LoginView;
