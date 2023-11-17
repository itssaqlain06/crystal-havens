import axios from 'axios';
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const publicUrl = process.env.PUBLIC_URL + '/website_assets/images/';

    const location = useLocation();
    const currentLocation = location.pathname;

    const tokenObj = JSON.parse(localStorage.getItem("token"));
    const token = tokenObj ? tokenObj.token : null;
    const navigate = useNavigate();


    const logoutUser = () => {
        axios
            .post("http://127.0.0.1:8000/api/user/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                localStorage.removeItem("token");
                navigate("/login");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                        <div className="full">
                            <div className="center-desk">
                                <div className="logo">
                                    <Link to="/"><img src={`${publicUrl}logo.png`} alt="#" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                        <nav className="navigation navbar navbar-expand-md navbar-dark ">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarsExample04">
                                <ul className="navbar-nav mr-auto">
                                    <li className={`nav-item ${currentLocation && currentLocation === "/" ? 'active' : null}`}>
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className={`nav-item ${currentLocation && currentLocation === "/about" ? 'active' : null}`}>
                                        <Link className="nav-link" to="/about">About</Link>
                                    </li>
                                    <li className={`nav-item ${currentLocation && currentLocation === "/room" ? 'active' : null}`}>
                                        <Link className="nav-link" to="/room">Room</Link>
                                    </li>
                                    <li className={`nav-item ${currentLocation && currentLocation === "/booking" ? 'active' : null}`}>
                                        <Link className="nav-link" to="/booking">Booking</Link>
                                    </li>
                                    <li className={`nav-item ${currentLocation && currentLocation === "/contact" ? 'active' : null}`}>
                                        <Link className="nav-link" to="/contact">Contact Us</Link>
                                    </li>
                                    <li className={`nav-item ${currentLocation && currentLocation === "/login" ? 'active' : null}`}>
                                        {token ? (
                                            <a href='javascript:void(0)' className="nav-link" onClick={logoutUser}>Logout</a>
                                        ) : (
                                            <Link className="nav-link" to='/login'>Login</Link>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
