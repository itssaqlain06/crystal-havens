import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Hotels() {
  const [hotels, setHotels] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hotel", { headers })
      .then((response) => {
        const data = response.data.success.details;
        setHotels(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response);
        setHotels("");
      });
  }, []);

  const viewHotels = (index) => {
    navigate(`/admin/hotel/view?${index}`);
  };

  const addHotel = () => {
    navigate("/admin/hotel/add");
  };

  const updateHotels = ((id)=>{
    navigate(`/admin/hotel/update?${id}`);
  })

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <button
            type="button"
            className="btn btn-primary mb-4 px-5"
            onClick={() => addHotel()}
          >
            Add
          </button>
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-color">Hotels</h3>
              {hotels !=="" && (
                <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels !== null &&
                    hotels.map((hotel, index) => (
                      <tr key={index}>
                        <th className="py-3" scope="row">
                          {index + 1}
                        </th>
                        <td className="py-3">{hotel.name}</td>
                        <td className="py-3">{hotel.email}</td>
                        <td className="py-3">{hotel.phone}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success m-2"
                            onClick={() => viewHotels(hotel.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning m-2"
                            onClick={() => updateHotels(hotel.id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              )}
              <span className="serverError">{error && error.statusText ? error.statusText : null}</span>
              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
