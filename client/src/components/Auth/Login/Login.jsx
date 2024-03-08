import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Login.css';
import { MdEmail  } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";




function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            const res = await axios.post("http://localhost:8000/login", {
                email, password
            })

                .then(res => {
                    const { data } = res;

                    console.log("Response data:", data);
                    if (res.data && res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('email', email);
                        history("/home", { state: { email: email } });
                    }
                    else if (res.data === "notexist") {
                        alert("User have not sign up")
                    } else if (res.data === "incorrectpassword") {
                        alert("password inccorect")
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }


    return (
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
}

export default Login