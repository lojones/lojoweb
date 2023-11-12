import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, [navigate]);
    return (
        <div>
            <h1>Home</h1>
            <p>Home page content</p>
            <div>some other text</div>
            <div>
                <Link to="/signin">Sign In</Link>
            </div>
            
        </div>
    );
};

export default Home;
