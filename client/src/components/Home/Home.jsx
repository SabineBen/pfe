import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
    const history = useNavigate();

    function handleLogout() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        history("/");
    }

    return (
        <div className="homepage">
            <h1>welcome to home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
