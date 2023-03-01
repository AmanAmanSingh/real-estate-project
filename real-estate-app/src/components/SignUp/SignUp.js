import React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./SignUp.css"
const url = "http://localhost:8080"
const SignUp = () => {
    const [userdetail, setuserdetail] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    })
    const navigate = useNavigate()
    const handlechange = (e) => {
        setuserdetail({ ...userdetail, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();

        const data = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdetail),
        }).then((data) => data.json())
            .then(data => {
                console.log(data)
                navigate("/");
            }).catch(e => {
                console.log(e)
            })

    };
    return (
        <>
            <div>
                <div id="main-container">
                    <h1 id="heading">Logo</h1>
                    <h6 id="heading-2">Create New Account</h6>
                    <div id="Signup-form">
                        <form onSubmit={handlesubmit}>
                            <div><input
                                className="Signup-input"
                                type="email"
                                placeholder="Email ID"
                                name="email"
                                onChange={handlechange}
                            /></div>
                            <div><input
                                className="Signup-input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handlechange}
                            /></div>
                            <div><input
                                className="Signup-input"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmpassword"
                                onChange={handlechange}

                            /></div>
                            <div>
                                <button className="Signup-input"
                                    id="button-signup" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="noaccount"><h4><Link to="/">Sign In</Link>
                </h4>
                </div>
            </div>

        </>
    )
}
export default SignUp;