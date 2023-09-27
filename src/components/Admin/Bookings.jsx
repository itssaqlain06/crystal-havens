import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Bookings() {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/booking", { headers })
      .then((response) => {
        const data = response.data.success.data;
        setBooking(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const viewBooking = (index) => {
    navigate(`/admin/viewBooking?${index}`);
  };

  const updateRoom = (index) => {
    navigate(`/admin/room/update?${index}`);
  };
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-color">Bookings</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" width="20px">#</th>
                    <th scope="col" width="20px">Room No</th>
                    <th scope="col" width="20px">Start Date</th>
                    <th scope="col" width="20px">End Date</th>
                    <th scope="col" width="20px">Number Of Guests</th>
                    <th scope="col" width="20px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {booking !== null &&
                    booking.map((room, index) => (
                      <tr key={index}>
                        <th className="py-3" scope="row">
                          {index + 1}
                        </th>
                        <td className="py-3">{room.room_id}</td>
                        <td className="py-3">{room.start_date}</td>
                        <td className="py-3">{room.end_date}</td>
                        <td className="py-3">{room.number_of_guests}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success m-2"
                            onClick={() => viewBooking(room.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning m-2"
                            onClick={() => updateRoom(room.id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
