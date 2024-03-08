import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Register.css';
import { MdEmail  } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

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
        <div className="compont">
              <div className="signup">
            <div className="cont sing">
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <div className="input-box">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <i> <FaUser /> </i>
                </div>
                <div className="input-box">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <i>     <MdEmail/>   </i>
                </div>
                <div className="input-box">
                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number" />
                <i> <FaPhone /> </i>
                </div>
                <div className="input-box">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <i>   <AiFillLock />   </i>
                </div>
               <button type="submit" className="btn">Submit</button>
               <div className="register-link">
                <p>You have account?</p><Link to="/" className="a">Login Page</Link>
               </div>
            </form>
            </div>
            <div className="sidee">
            <span className="bg-animate"></span>
            </div>
        </div>
        </div>
      
    )
}

export default Signup;
