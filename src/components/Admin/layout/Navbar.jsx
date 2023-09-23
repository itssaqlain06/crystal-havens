import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "./Footer"

export default function Navbar() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate("/admin/login");
        }
    },[])
    const logoutUser = (()=>{
        localStorage.removeItem('token');
        navigate('/admin/login');
    })
    return (
        <div className="content">
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0">
                        <i className="fa fa-hashtag"></i>
                    </h2>
                </a>
                <a href="#" className="sidebar-toggler flex-shrink-0">
                    <i className="fa fa-bars"></i>
                </a>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                className="rounded-circle me-lg-2"
                                src={`${process.env.PUBLIC_URL}/admin_assets/img/user.jpg`}
                                alt=""
                                style={{ width: "40px", height: "40px" }}
                            />
                            <span className="d-none d-lg-inline-flex">Admin</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <button onClick={()=>logoutUser()} className="dropdown-item">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* This is dashboard section */}
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-line fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Today Sale</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-bar fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Total Sale</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-area fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Today Revenue</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i className="fa fa-chart-pie fa-3x text-primary"></i>
                            <div className="ms-3">
                                <p className="mb-2">Total Revenue</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
