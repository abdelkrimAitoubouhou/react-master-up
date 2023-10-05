import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {connect, useDispatch} from "react-redux";
import {setPath, signIn} from "../../actions/authService";
import Logo from "../logo-re.png";

const SignIn = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const login = () => {
        const payload = {
            username,
            password
        }
        dispatch(signIn(payload));
    }

    return (

        <MDBContainer style={{fontFamily: 'Lato', paddingTop: '0rem'}} className="my-5 gradient-form">
            <MDBRow>
                <MDBCol style={{backgroundColor: '#fff'}} col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5 mr-5">

                        <div className="text-center">
                            <img  className="logoSignIn" src={Logo} alt="Logo" />
                            <h4 className="mt-1 mb-5 pb-1" style={{fontFamily: "serif", fontStyle: "oblique",position:"relative" ,top: '-5px'}}>Always at your service</h4>


                        </div>

                        <p>Please login to your account</p>

                        <MDBInput wrapperClass='mb-4' label='Login' id='form1'
                                  onChange={(e) => setUsername(e.target.value)} type='username'/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form2'
                                  onChange={(e) => setPassword(e.target.value)} type='password'/>


                        <div className="text-center pt-1 mb-5 pb-1">
                            <MDBBtn onClick={login}
                                    className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
                            <a className="text-muted" href="#!">Forgot password?</a>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <MDBBtn onClick={() => dispatch(setPath('signUp'))} outline className='mx-2'
                                    color='danger'>
                                sign up
                            </MDBBtn>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">We are more than just a company</h4>
                            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                do
                                eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(SignIn);
