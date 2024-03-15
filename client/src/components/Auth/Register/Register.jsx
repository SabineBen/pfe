<<<<<<< HEAD
import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Register.css';
import { MdEmail  } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
=======
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
>>>>>>> 0351780467f333dde925b79c120f8e17722a1898

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
            const response = await axios.post("https://pfe-qvol.onrender.com/register", {
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
<<<<<<< HEAD
            </div>
            <div className="sidee">
            <span className="bg-animate"></span>
            </div>
=======
            {error && <p className="error">{error}</p>}
            <p>OR</p>
            <Link to="/login">Login Page</Link>
>>>>>>> 0351780467f333dde925b79c120f8e17722a1898
        </div>
        </div>
      
    )
}

export default Signup;
