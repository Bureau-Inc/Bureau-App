import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    verifyOtp,
    generateOtp
} from '../../sagas';
import { navigateToLoginSuccessful } from '../../actions/navigationActions';
import OtpVerificationView from './OtpVerificationView';

class OtpContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <OtpVerificationView {...this.props} />;
    }
}


function mapDispatchToProps(dispatch) {
    return {
        showLoginSuccessfulScreen: navigateToLoginSuccessful,
        verifyOtp,
        generateOtp
    };
}
export default connect(
    null,
    mapDispatchToProps
)(OtpContainer);
