import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { BlueContainer } from '../../config/svgs';
import styles from './styles';
import images from '../../config/images';

class LoginView extends Component {
    constructor(props) {
        super(props);
    }
    navigate = () => {};

    render() {
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
                                <Text style={styles.heading}>
                                    Welcome!
                                </Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                Login successful
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default LoginView;
