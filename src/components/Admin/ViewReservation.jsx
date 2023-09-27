import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function ViewReservation() {
  const [reservationId, setReservationId] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [reservationDel, setReservationDel] = useState(null);
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const param = searchParam.entries();
    for (const [key, value] of param) {
      setReservationId(key);
    }
    if (reservationId) {
      const getUser = `http://127.0.0.1:8000/api/reservation/${reservationId}`;

      axios
        .get(getUser, { headers })
        .then((response) => {
          const data = response.data.success.data;
          setReservation(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [reservationId, searchParam]);

  const deleteUser = (index) => {
    axios
      .delete(`http://127.0.0.1:8000/api/booking/delete/${index}`)
      .then((response) => {
        const del = response.data.success;
        setReservationDel(del);
        setReservation(null);
        setTimeout(() => {
          navigate("/admin/bookings");
        }, 3000);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-color">Manage Reservation</h3>
              <span className="delSuccess">
                {reservationDel && reservationDel.message ? reservationDel.message : null}
              </span>
              {reservation !== null && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Room No</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">No Of Guests</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservation !== null && (
                      <tr key={reservation.id}>
                        <th className="py-3" scope="row">
                          1
                        </th>
                        <td className="py-3">{reservation.room_id}</td>
                        <td className="py-3">{reservation.start_date}</td>
                        <td className="py-3">{reservation.end_date}</td>
                        <td className="py-3">{reservation.number_of_guests}</td>
                        <td className="py-3">{reservation.total_amount}</td>
                        <td className="py-3">
                          {reservation.created_at
                            ? reservation.created_at.substring(0, 10)
                            : null}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-2"
                            onClick={() => deleteUser(reservation.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
