import React, {useState} from 'react';
import SignIn from "../signin";
import Signup from "../signup";
import {connect} from "react-redux";

const LoginComponent = ({ path }) => {

    return (
        path === 'signIn' ? <SignIn /> : <Signup />
    );
};
const mapStateToProps = state => {
    return {
        path: state.auth.path
    }
}
export default connect(mapStateToProps)(LoginComponent);
