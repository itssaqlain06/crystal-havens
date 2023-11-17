import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function About() {
    const publicUrl = process.env.PUBLIC_URL + '/website_assets/images/';
    const location = useLocation();
    const currentUrl = location.pathname;
    return (
        <div className="about">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5">
                        <div className="titlepage">
                            <h2>About Us</h2>
                            <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.</p>
                            {currentUrl && currentUrl === "/about" ? "" : <Link className="read_more" to="/about">Read More</Link>}
                            
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="about_img">
                            <figure><img src={`${publicUrl}about.png`} alt="#" /></figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
