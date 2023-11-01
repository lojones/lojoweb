import React from "react";

const SignInPage: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
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
