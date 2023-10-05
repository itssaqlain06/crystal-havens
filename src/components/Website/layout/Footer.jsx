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
                                    <li><i className="fa fa-map-marker" aria-hidden="true"></i> Address</li>
                                    <li><i className="fa fa-mobile" aria-hidden="true"></i> +01 1234569540</li>
                                    <li> <i className="fa fa-envelope" aria-hidden="true"></i><a href="#"> demo@gmail.com</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>Menu Link</h3>
                                <ul className="link_menu">
                                    <li className={`${currentLocation && currentLocation === "/" ? 'active' : null}`}><Link to="/">Home</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/about" ? 'active' : null}`}><Link to="/about"> About</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/room" ? 'active' : null}`}><Link to="/room">Room</Link></li>
                                    <li className={`${currentLocation && currentLocation === "/contact" ? 'active' : null}`}><Link to="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h3>News letter</h3>
                                <form className="bottom_form">
                                    <input className="enter" placeholder="Enter your email" type="text" name="Enter your email" />
                                    <button className="sub_btn">subscribe</button>
                                </form>
                                <ul className="social_icon">
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
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
