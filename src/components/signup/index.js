import React, {useState} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {setPath, signUp} from "../../actions/authService";
import {useDispatch} from "react-redux";

const Signup = () => {


    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const reset = () => {
        setUsername('');
        setPassword('');
        setLastname('');
        setFirstname('');
        setEmail('');
        setPhone('');
    }
    const signup = async () => {
        const client = {
            firstName,
            lastName,
            phone,
            email,
            username,
            password,
            role: 'USER'
        }

        await dispatch(signUp(client));
        reset();
    };

    return (
        <MDBContainer style={{fontFamily: 'Lato', height: '100vh'}} fluid
                      className='p-4 background-radial-gradient overflow-hidden'>
            <MDBRow>
                <MDBCol offsetMd='1' md='6' style={{height: '80vh'}}
                        className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                        YOUR SATISFACTION <br/>
                        <span style={{color: 'hsl(218, 81%, 75%)'}}>our priority</span>
                    </h1>


                </MDBCol>

                <MDBCol md='4' style={{top: 110}}>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard style={{borderRadius: 0}} className='my-5 bg-glass sign-up'>
                        <MDBCardBody style={{backgroundColor: '#fff'}} className='p-5'>

                            <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'
                                      onChange={(e) => setFirstname(e.target.value)}/>

                            <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'
                                      onChange={(e) => setLastname(e.target.value)}/>

                            <MDBInput wrapperClass='mb-4' label='Pone' id='form3' type='number'
                                      onChange={(e) => setPhone(e.target.value)}/>

                            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'
                                      onChange={(e) => setEmail(e.target.value)}/>

                            <MDBInput wrapperClass='mb-4' label='Username' id='form2' type='text'
                                      onChange={(e) => setUsername(e.target.value)}/>

                            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'
                                      onChange={(e) => setPassword(e.target.value)}/>

                            <MDBBtn className='w-100 mb-4' size='md' onClick={() => signup()}>sign up</MDBBtn>

                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <p className="mb-0">You have already an account?</p>
                                <MDBBtn onClick={() => dispatch(setPath('signIn'))}  className='me-4'
                                        color='secondary'>
                                    sign in
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default Signup;
