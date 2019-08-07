import React from 'react';
import {connect} from 'react-redux';

import Home from './Home';
import AuthForm from './AuthForm';

class Root extends React.Component {

    render() {
        return (this.props.account.signedIn
            ? <Home/>
            : <AuthForm/>);

    }
}

export default connect(({account}) => ({account}))(Root);