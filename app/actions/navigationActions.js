/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService';

export function navigateToLoginSuccessful(params) {
    NavigationService.navigate('LoginSuccessful', params);
}
