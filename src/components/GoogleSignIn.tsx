import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { googleTokenSignginUrl } from '../utils/envvars';
import { useNavigate } from "react-router-dom";

const GoogleSignIn:React.FC = () => {
  const navigate = useNavigate();
  // This function will be called upon a successful login
  const handleSuccess = async (credentialResponse:CredentialResponse) => {
    console.log('Google login successful', credentialResponse);
    // If you are using the authorization code flow, you will receive a code to be exchanged for an access token
    const jwtToken = credentialResponse.credential;

    // Send the authorization code to your backend server
    const response = await fetch(googleTokenSignginUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: jwtToken }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      console.log('Google login failed',response);
    }
    
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        // onSuccess={credentialResponse => {
        //   console.log(credentialResponse);
        // }}
        // onError={() => {
        //   console.log('Login Failed');
        // }}
        // useOneTap
      />
    </div>
  );
}

export default GoogleSignIn;