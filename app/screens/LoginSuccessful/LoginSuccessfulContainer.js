import React, { Component } from 'react';

import LoginSuccessfulView from './LoginSuccessfulView';

import {  } from '../../sagas/auth';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoginSuccessfulView {...this.props} />;
    }
}
export default LoginContainer;
