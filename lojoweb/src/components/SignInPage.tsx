import React from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

        const response = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log('Sign in successful');
            setErrorMessage('Sign in successfully');
            const token = data.token;
            sessionStorage.setItem('token', token);
            navigate('/');
        } else {
            setErrorMessage(data.message || 'Sign in failed');
        }



    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">Username/Email</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" onClick={handleSignIn}>Sign In</button>
                <div>{errorMessage}</div>
            </form>
            <div>
                <button>Sign In with Google</button>
                <button>Sign In with Microsoft</button>
                <button>Sign In with Facebook</button>
                <button>Sign In with LinkedIn</button>
            </div>
        </div>
    );
};

export default SignInPage;
