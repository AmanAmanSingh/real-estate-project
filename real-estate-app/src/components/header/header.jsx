import React from "react";
import './header.css'
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate()
    const Logoutbutton = () => {
        localStorage.setItem("authtoken", "");
        localStorage.removeItem("id");
        navigate("/")
    };
    const userid = localStorage.getItem("id").slice(0, -18);
    console.log(userid)
    return (
        <div className="header">
            <div className="left"> USER ID:{userid}
            </div>
            <div className="right">
                <i className="fa fa-user" aria-hidden="true"></i>

                <button onClick={Logoutbutton}>
                    Logout
                </button>

            </div>
        </div>
    )
}


export default Header;