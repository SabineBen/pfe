import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://pfe-qvol.onrender.com/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Method": "POST",
                    }
                }
            );
            const { data } = response;

            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);

            if (data.user.role == 'admin') {
                navigate("/besoins");
            } else {
                navigate("/home");
            }

            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
            {error && <p className="error">{error}</p>}
            <br />
            <p>OR</p>
            <br />
            <Link to="/signup">Signup Page</Link>
        </div>
    );
}

export default Login;
