import { StyleSheet, Dimensions } from 'react-native';

import AppStyles from '../../config/styles';

const styles = StyleSheet.create({
    button: {
        height: 45,
        width: '90%'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        width: '100%'
    },
    container: {
        alignItems: 'center',
        flex: 1
    },
    gradient: {
        alignItems: 'center',
        borderBottomLeftRadius: 185,
        borderBottomRightRadius: 370,
        height: Dimensions.get('window').height * 2/3,
        width: '145%'
    },
    logo: {
        height: '100%',
        width: '100%'
    },
    logoContainer: {
        height: 40,
        width: 120
    },
    phoneNumber: {
        color:AppStyles.colors.BLACK,
        fontSize: 17
    },
    phoneNumberContainer: {
        borderRadius: 5,
        flexDirection: 'row',
        height: '30%',
        overflow: 'hidden',
        width:'100%'
    },
    phoneNumberInputContainer: {
        backgroundColor: AppStyles.colors.WHITE,
        height: '100%',
        padding:3,
        width:'85%'
    },
    phoneNumberPrefixContainer: {
        alignItems: 'center',
        backgroundColor: AppStyles.colors.WHITE,
        borderRightWidth: 1,
        height: '100%',
        padding: 3,
        width: '15%'
    },
    text: {
        color: AppStyles.colors.WHITE,
        fontSize: 17
    },
    textContainer: {
        paddingBottom: '5%'
    },
    topContainer: {
        height: '100%',
        justifyContent: 'space-around',
        padding: 15,
        width: '65%'
    }
});

export default styles;
