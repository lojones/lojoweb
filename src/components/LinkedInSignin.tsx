import React from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { linkedInTokenSignginUrl,linkedInOauthClientId } from '../utils/envvars';
import { useNavigate } from "react-router-dom";

const LinkedInSignIn:React.FC = () => {
  const navigate = useNavigate();



  // This function will be called upon a successful login
  const handleSuccess = async (authcode:string) => {
    console.log('LInkedin login successful');

    // Send the authorization code to your backend server
    const response = await fetch(linkedInTokenSignginUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorizationToken: authcode }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('authtype', 'linkedin');
      navigate('/');
    } else {
      console.log('LinkedIn login failed',response);
    }
    
  };

  const handleError = () => {
    console.error('Linkedin login failed');
  };

  const {linkedInLogin } = useLinkedIn({
    clientId: linkedInOauthClientId(),
    redirectUri: `${window.location.origin}/linkedin`,
    scope: 'profile email openid r_learningdata', // Get access token and basic profile
    onSuccess: handleSuccess,
    onError: handleError
  });

  return (
    <div>
        <img
            onClick={linkedInLogin}
            src={linkedin}
            alt="Sign in with Linked In"
            style={{ maxWidth: '180px', cursor: 'pointer' }}
            />
    </div>
  );
}

export default LinkedInSignIn;