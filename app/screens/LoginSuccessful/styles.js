import { StyleSheet, Dimensions } from 'react-native';

import AppStyles from '../../config/styles';

const styles = StyleSheet.create({
    absoluteContainer: {
        position: 'absolute'
    },
    container: {
        alignItems: 'flex-start',
        flex: 1,
        position: 'relative'
    },
    curveContainer: {
        alignItems: 'flex-end',
        marginHorizontal: -415,
        marginTop: (Dimensions.get('screen').height * 3/5) - 900,
        position: 'absolute',
        width: '150%'
    },
    heading: {
        color: AppStyles.colors.WHITE,
        fontFamily: AppStyles.fonts.FONT_REGULAR,
        fontSize: 28
    },
    logo: {
        height: '100%',
        width: '100%',
    },
    logoContainer: {
        height: 40,
        width: 120,
    },
    text: {
        color: AppStyles.colors.WHITE,
        fontFamily: AppStyles.fonts.FONT_REGULAR,
        fontSize: 14
    },
    textContainer: {
        height: 40,
        justifyContent: 'center',
        marginBottom: '5%'
    },
    topContainer: {
        height: Dimensions.get('screen').height * 2/5,
        justifyContent: 'space-around',
        padding: 25,
        width: '100%'
    }
});

export default styles;
