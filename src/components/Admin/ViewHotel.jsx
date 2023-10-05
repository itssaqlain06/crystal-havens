import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function ManageHotel() {
  const [hotelId, setHotelId] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const [hotelDel, setHotelDel] = useState(null);
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const param = searchParam.entries();
    for (const [key, value] of param) {
      setHotelId(key);
    }
    if (hotelId) {
      const getUser = `http://127.0.0.1:8000/api/hotel/${hotelId}`;

      axios
        .get(getUser, { headers })
        .then((response) => {
          const data = response.data.success.data;
          setHotel(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.response);
        });
    }
  }, [hotelId, searchParam]);

  const deleteUser = (index) => {
    axios
      .delete(`http://127.0.0.1:8000/api/hotel/delete/${index}`)
      .then((response) => {
        const del = response.data.success;
        setHotelDel(del);
        setHotel(null);
        setTimeout(() => {
          navigate("/admin/hotels");
        }, 3000);
      })
      .catch((error) => {
        setError(error);
        setHotel("");
      });
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-color">View Hotel</h3>
              <span className="delSuccess">
                {hotelDel && hotelDel.message ? hotelDel.message : null}
              </span>
              {hotel !== null && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Star Rating</th>
                      <th scope="col">
                        Country <br /> State <br /> City
                      </th>
                      <th scope="col">Address</th>
                      <th scope="col">Description</th>
                      <th scope="col" width="100px">Created At</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel !== null && (
                      <tr key={hotel.id}>
                        <th className="py-3" scope="row">
                          1
                        </th>
                        <td className="py-3">{hotel.name}</td>
                        <td className="py-3">{hotel.email}</td>
                        <td className="py-3">{hotel.phone}</td>
                        <td className="py-3">{hotel.star_rating}</td>
                        <td className="py-3">
                          {hotel.country} / <br /> {hotel.state} <br /> / {hotel.city}
                        </td>
                        <td className="py-3">{hotel.address}</td>
                        <td className="py-3">{hotel.description}</td>
                        <td className="py-3">
                          {hotel.created_at
                            ? hotel.created_at.substring(0, 10)
                            : null}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-2"
                            onClick={() => deleteUser(hotel.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
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
