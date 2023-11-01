import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {

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
