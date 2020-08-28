import React, { Component } from 'react';

import LoginSuccessfulView from './LoginSuccessfulView';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoginSuccessfulView {...this.props} />;
    }
}
export default LoginContainer;
