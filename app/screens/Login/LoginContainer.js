import React, { Component } from 'react';
import LoginView from './LoginView';
import { connect } from 'react-redux';

import {
    authDiscover as authDiscoverSaga,
    authInitiate as authInitiateSaga,
    authFinalize as authFinalizeSaga,
    getUserInfo
} from '../../sagas';
import { navigateToLoginSuccessful } from '../../actions/navigationActions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoginView {...this.props} />;
    }
}

const mapStateToProps = ({ auth }) => {
    return { isLoginProcessing: auth.isLoginProcessing };
};

const mapDispatchToProps = () => ({
    showLoginSuccessfulScreen: navigateToLoginSuccessful,
    authDiscover : authDiscoverSaga,
    authInitiate: authInitiateSaga,
    authFinalize: authFinalizeSaga,
    getUserInfo
});
    
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
