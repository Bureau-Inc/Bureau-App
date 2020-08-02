import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from 'app/screens/Login';
import LoginSuccessful from 'app/screens/LoginSuccessful';

const RNApp = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: { header: null, gesturesEnabled: false }
        },
        LoginSuccessful: {
            screen: LoginSuccessful,
            navigationOptions: { header: null, gesturesEnabled: false }
        }
    },
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(RNApp);
