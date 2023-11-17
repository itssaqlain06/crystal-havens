import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
    const location = useLocation();
    const currentLocation = location.pathname;
    const CurrentDate = new Date();
    const currentYear = CurrentDate.getFullYear();
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-4">
                                <h3>Contact US</h3>
                                <ul className="conta">
                                    <li><i className="fa fa-map-marker" aria-hidden="true"></i> Okara, Punjab, Pakistan</li>
                                    <li><i className="fa fa-mobile" aria-hidden="true"></i> +92-341-580-2244</li>
                                    <li><i style={{ fontSize: '18px' }} className="fa fa-envelope" aria-hidden="true"></i><a href="mailto:itssaqlain06@gmail.com">itssaqlain06@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>Menu Link</h3>
                                <ul className="link_menu">
                                    <li className={`${currentLocation && currentLocation === "/" ? 'active' : null}`}><Link to="/">Home</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/about" ? 'active' : null}`}><Link to="/about"> About</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/room" ? 'active' : null}`}><Link to="/room">Room</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/booking" ? 'active' : null}`}><Link to="/booking">Booking</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/contact" ? 'active' : null}`}><Link to="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>News letter</h3>
                                <div className="bottom_form">
                                    <input className="enter" placeholder="Enter your email" type="text" name="Enter your email" />
                                    <button className="sub_btn">subscribe</button>
                                </div>
                                <ul className="social_icon">
                                    <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a target='_blank' href="https://www.linkedin.com/in/itssaqlain06/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                    <li><a href="https://github.com/itssaqlain06/"><i className="fa fa-github" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 offset-md-1">

                                    <p>
                                        © {currentYear} All Rights Reserved by <a href="#"> Saqlain</a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
