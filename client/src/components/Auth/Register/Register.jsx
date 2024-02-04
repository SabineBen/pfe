import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/register", {
                email,
                password,
                name,
                phoneNumber,
            });

            const { data } = response;

            console.log("Response data:", data);

            if (data.token) {
                console.log("Token:", data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);

                navigate("/home", { state: { id: email } });
            }

            if (data === "exist") {
                alert("User already exists");
            } else if (data === "notexist") {
                alert("User registered successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while registering");
        }
    }

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
            <p>OR</p>
            <Link to="/">Login Page</Link>
        </div>
    )
}

export default Signup;
