import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


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
        <div className="login">

            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>

        </div>
    )
}

export default Login