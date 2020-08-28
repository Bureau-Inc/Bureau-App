import { StyleSheet, Dimensions } from 'react-native';

import AppStyles from '../../config/styles';

const styles = StyleSheet.create({
    absoluteContainer: {
        position: 'absolute'
    },
    button: {
        height: 45,
        width: '90%'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        width: '100%'
    },
    container: {
        alignItems: 'flex-start',
        flex: 1,
        position: 'relative',
        paddingBottom: 200,
    },
    curveContainer: {
        alignItems: 'flex-end',
        marginHorizontal: -415,
        marginTop: (Dimensions.get('screen').height * 3/5) - 900,
        position: 'absolute',
        width: '150%'
    },
    dropDownContainer: {
        height: 48,
        width: '15%'
    },
    dropDownItem: {
        justifyContent: 'center'
    },
    dropDownLabel:{
        color: AppStyles.colors.BLACK
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        fontSize: 17,
        textAlignVertical: 'center',
    },
    phoneNumberContainer: {
        borderRadius: 5,
        flexDirection: 'row',
        height: 48,
        marginBottom: '15%',
        overflow: 'hidden',
        width:'80%'
    },
    phoneNumberInputContainer: {
        backgroundColor: AppStyles.colors.WHITE,
        height: 48,
        padding: 2,
        width:'80%',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    phoneNumberPrefixContainer: {
        alignItems: 'center',
        backgroundColor: AppStyles.colors.WHITE,
        borderRightWidth: 1,
        height: 48,
        padding: 2,
        width: '20%',
        justifyContent: 'center',
    },
    text: {
        color: AppStyles.colors.WHITE,
        fontFamily: AppStyles.fonts.FONT_REGULAR,
        fontSize: 16,
        lineHeight: 25
    },
    textContainer: {
        paddingBottom: '5%'
    },
    topContainer: {
        height: Dimensions.get('screen').height * 3/5,
        justifyContent: 'space-around',
        padding: 25,
        width: '100%'
    }
});

export default styles;