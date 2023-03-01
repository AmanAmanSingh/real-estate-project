import React from "react"
import { useState } from "react"
import "./SignIn.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
const link = "http://localhost:8080"
const SignIn = () => {
    const navigate = useNavigate()
    const [userdetail, setuserdetail] = useState({
        email: "",
        password: "",
    })

    const handlechange = (e) => {
        setuserdetail({ ...userdetail, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()

        const data = await fetch(`${link}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdetail),
        }).then((data) => data.json())
            .then((response) => {
                console.log(response, "res");
                localStorage.setItem("authtoken", response.token);
                localStorage.setItem("id", response.id);
                navigate("/propertylist")
            }).catch(e => {
                console.log(e)
            })
        // if (data.status === "success") {
        //     console.log(data.message)
        // }
    }

    return (
        <>
            <div>
                <div id="main-container">
                    <h1 id="heading">Logo</h1>
                    <h6 id="heading-2">Enter Your Credentials To access your Account</h6>
                    <div id="Signin-form">
                        <form onSubmit={handlesubmit}>
                            <div><input
                                className="Signin-input"
                                type="text"
                                placeholder="email"
                                name="email"
                                onChange={handlechange}
                            /></div>
                            <div><input
                                className="Signin-input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handlechange}

                            /></div>
                            <div>
                                <button className="Signin-input" id="button-signin" type="submit">Sign In</button>
                                <div id="Signup">
                                    <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="noaccount"><h4>Don't have an Account ? <Link to="/signup"> Sign Up</Link>
                </h4>
                </div>
            </div>

        </>
    )
}
export default SignIn