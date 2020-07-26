import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import { Button } from '../../components';
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
                <LinearGradient
                    colors={['#09C2FF', '#324EA3', '#324EA3']}
                    useAngle={true}
                    angle={45}
                    style={styles.gradient}
                >
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
                                        onChangeText={text => onChangeText(text)}
                                        value={this.state.phoneNumber}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.buttonContainer}>
                    <Button
                        buttonText={'LOGIN'}
                        customStyle={styles.button}
                        onButtonPress={()=>{}}
                    />
                </View>
            </View>
        );
    }
}

LoginView.propTypes = {
    onLogin: PropTypes.func
};

export default LoginView;
