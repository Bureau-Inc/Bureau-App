import React, { Component } from 'react';
import LoginView from './LoginView';
import { connect } from 'react-redux';

import {
    authInitiate,
    authFinalize,
    getUserInfo
} from '../../sagas';
import { navigateToLoginSuccessful, navigateToOTP } from '../../actions/navigationActions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoginView {...this.props} />;
    }
}


const mapDispatchToProps = () => ({
    showLoginSuccessfulScreen: navigateToLoginSuccessful,
    showOtpScreen: navigateToOTP,
    authInitiate,
    authFinalize,
    getUserInfo
});
    
export default connect(
    null,
    mapDispatchToProps
)(LoginContainer);
