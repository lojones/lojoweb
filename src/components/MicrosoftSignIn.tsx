import React from 'react';
import MicrosoftLogin from "react-microsoft-login";
import { microsoftOauthClientId, microsoftOauthRediretUri, microsoftOauthTenantId, microsoftTokenSignginUrl } from '../utils/envvars';
import { useNavigate } from "react-router-dom";

const MicrosoftSignIn: React.FC = () => {

  const authority = `https://login.microsoftonline.com/${microsoftOauthTenantId()}`;

  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  const navigate = useNavigate();
  // This function will be called upon a successful login
  const handleSuccess = async (err: any, data: any) => {
    console.log('Microsoft login successful', err, data);
    // If you are using the authorization code flow, you will receive a code to be exchanged for an access token
    const idToken = data.idToken;
    const accessToken = data.accessToken;

    // Send the authorization code to your backend server
    const response = await fetch(microsoftTokenSignginUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: idToken, accessToken: accessToken }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('authtype', 'microsoft');
      localStorage.setItem('microsoftaccesstoken', accessToken);
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
        <MicrosoftLogin 
          clientId={microsoftOauthClientId()} 
          authCallback={handleSuccess} 
          tenantUrl={authority}
          redirectUri={microsoftOauthRediretUri()}
          >
        </MicrosoftLogin>
    </div>
  );
};

export default MicrosoftSignIn;
