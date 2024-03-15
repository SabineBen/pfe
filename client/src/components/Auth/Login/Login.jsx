<<<<<<< HEAD
import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Login.css';
import { MdEmail  } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";



=======
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
>>>>>>> 0351780467f333dde925b79c120f8e17722a1898

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
<<<<<<< HEAD
        <div className="comp">
              <div className="login">
            <div className="cont log">
            <form action="POST">
            <h1>Login</h1>
            <div className="input-box" >
              <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} /> 
              <i>     <MdEmail/>   </i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
              <i>   <AiFillLock />   </i>
            </div>
            <button type="submit" className="btn" onClick={submit}>Login</button>
            <div className="register-link">
              <p>Don't have an account?<Link to="/signup" className="a">Signup</Link></p>
            </div>
            </form>
            </div>
            <div className="side">
            <span className="bg-animate"></span>
            </div>
        </div>
        </div>
      
    )
=======
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
>>>>>>> 0351780467f333dde925b79c120f8e17722a1898
}

export default Login;
