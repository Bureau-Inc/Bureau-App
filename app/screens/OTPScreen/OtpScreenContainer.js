import React, { Component } from 'react';
import OtpScreenView from './OtpScreenView';
import { connect } from 'react-redux';

class OtpScreenContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <OtpScreenView {...this.props} />;
    }
}

function mapStateToProps() {
    return {};
}
export default connect(
    mapStateToProps,
    null
)(OtpScreenContainer);
