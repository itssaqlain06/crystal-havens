import React from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';
import About from './About';
import Room from './Room';
import Contact from './Contact';

export default function Index() {
    const publicUrl = process.env.PUBLIC_URL + '/website_assets/images/';
    return (
        <div className="main-layout">

            {/* <div className="loader_bg">
                <div className="loader"><img src={`${publicUrl}loading.gif`} alt="#" /></div>
            </div> */}

            <Header/>
            
            <section className="banner_main">
                <div id="myCarousel" className="carousel slide banner" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="first-slide" src={`${publicUrl}banner1.jpg`} alt="First slide" />
                            <div className="container">
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="second-slide" src={`${publicUrl}banner2.jpg`} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="third-slide" src={`${publicUrl}banner3.jpg`} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                {/* <div className="booking_ocline">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="book_room">
                                    <h1>Book a Room Online</h1>
                                    <form className="book_now">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span>Arrival</span>
                                                <img className="date_cua" src={`${publicUrl}date.png`} />
                                                <input className="online_book" placeholder="dd/mm/yyyy" type="date" name="dd/mm/yyyy" />
                                            </div>
                                            <div className="col-md-12">
                                                <span>Departure</span>
                                                <img className="date_cua" src={`${publicUrl}date.png`} />
                                                <input className="online_book" placeholder="dd/mm/yyyy" type="date" name="dd/mm/yyyy" />
                                            </div>
                                            <div className="col-md-12">
                                                <button className="book_btn">Book Now</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </section>

            <About />

            <Room />

            {/* <div className="gallery">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2>gallery</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery1.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery2.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery3.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery4.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery5.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery6.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery7.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery_img">
                                <figure><img src={`${publicUrl}gallery8.jpg`} alt="#" /></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2>Blog</h2>
                                <p>Lorem Ipsum available, but the majority have suffered </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="blog_box">
                                <div className="blog_img">
                                    <figure><img src={`${publicUrl}blog1.jpg`} alt="#" /></figure>
                                </div>
                                <div className="blog_room">
                                    <h3>Bed Room</h3>
                                    <span>The standard chunk </span>
                                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorsIf you are   </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="blog_box">
                                <div className="blog_img">
                                    <figure><img src={`${publicUrl}blog2.jpg`} alt="#" /></figure>
                                </div>
                                <div className="blog_room">
                                    <h3>Bed Room</h3>
                                    <span>The standard chunk </span>
                                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorsIf you are   </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="blog_box">
                                <div className="blog_img">
                                    <figure><img src={`${publicUrl}blog3.jpg`} alt="#" /></figure>
                                </div>
                                <div className="blog_room">
                                    <h3>Bed Room</h3>
                                    <span>The standard chunk </span>
                                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorsIf you are   </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <Contact />

            <Footer />
        </div>
    )
}
