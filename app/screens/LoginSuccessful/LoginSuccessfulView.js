import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class LoginView extends Component {
    constructor(props) {
        super(props);
    }
    navigate = () => {};

    render() {
        return (
            <WebView
                source={{ uri: 'https://www.gojek.io/'}}
            />
        );
    }
}

export default LoginView;
