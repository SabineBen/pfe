import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/register", {
                email,
                password,
                name,
                phoneNumber,

            });

            const { data } = response;

            if (data.message === "User created successfully") {

                navigate("/home");
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                console.log(data)
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred while signing up");
            console.error("Error:", error);
        }
    };

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>OR</p>
            <Link to="/login">Login Page</Link>
        </div>
    )
}

export default Signup;
