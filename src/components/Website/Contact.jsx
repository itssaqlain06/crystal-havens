import React from 'react'

export default function Contact() {
    return (
        <div className="contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="titlepage">
                            <h2>Contact Us</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div id="request" className="main_form">
                            <div className="row">
                                <div className="col-md-12 ">
                                    <input className="contactus" placeholder="Name" type="type" name="Name" />
                                </div>
                                <div className="col-md-12">
                                    <input className="contactus" placeholder="Email" type="type" name="Email" />
                                </div>
                                <div className="col-md-12">
                                    <input className="contactus" placeholder="Phone Number" type="type" name="Phone Number" />
                                </div>
                                <div className="col-md-12">
                                    <textarea className="textarea" placeholder="Message" type="type" Message="Name">Message</textarea>
                                </div>
                                <div className="col-md-12">
                                    <button className="send_btn">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="map_main">
                            <div className="map-responsive">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1111.0724467967316!2d73.43472383201551!3d30.80217024752893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922a7a2536b9c55%3A0x41a2fa220b2a7007!2seFAIDA%20Technologies!5e0!3m2!1sen!2s!4v1700069585881!5m2!1sen!2s"
                                    width={600}
                                    height={450}
                                    style={{ border: '0' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
