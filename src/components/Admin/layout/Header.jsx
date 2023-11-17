import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const tokenObj = JSON.parse(localStorage.getItem("token"));
  const token = tokenObj ? tokenObj.token : null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  const logoutUser = () => {
    axios
      .post("http://127.0.0.1:8000/api/user/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.warn(response);
        localStorage.removeItem("token");
        navigate("/admin/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-hashtag"></i>
        </h2>
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
            <button onClick={() => logoutUser()} className="dropdown-item">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
