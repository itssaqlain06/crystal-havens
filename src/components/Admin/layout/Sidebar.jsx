import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, []);
  const imageUrl = process.env.PUBLIC_URL;

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <Link to="/admin" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-hashtag me-2"></i>DASHMIN
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src={`${imageUrl}/admin_assets/img/user.jpg`}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Jhon Doe</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link to="/admin" className="nav-item nav-link active">
              <i className="fa fa-tachometer-alt me-2"></i>Dashboard
            </Link>

            <Link to="/admin/users" className="nav-item nav-link">
              <i className="fa fa-user"></i>&nbsp; Users
            </Link>
            <Link to="/admin/hotels" className="nav-item nav-link">
              <i className="fas fa-building"></i>&nbsp; Hotels
            </Link>
            <Link to="/admin/rooms" className="nav-item nav-link">
              <i className="fas fa-bed"></i>&nbsp; Rooms
            </Link>
            <Link to="/admin/bookings" className="nav-item nav-link">
              <i className="fas fa-person-booth"></i>&nbsp; Bookings
            </Link>
          </div>
        </nav>
      </div>

      {/* Back to To */}
      <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </Link>
    </div>
  );
}
