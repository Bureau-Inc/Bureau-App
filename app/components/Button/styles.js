import { StyleSheet } from 'react-native';

import AppStyles from '../../config/styles';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: AppStyles.colors.PRIMARY,
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttonText: {
        color: AppStyles.colors.WHITE,
        fontFamily: AppStyles.fonts.FONT_BOLD,
        fontSize: 17
    }
});

export default styles;