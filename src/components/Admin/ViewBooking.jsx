import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function ViewBooking() {
  const [bookingId, setBookingId] = useState(null);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [bookingDel, setBookingDel] = useState(null);
  const navigate = useNavigate();
  const [toggleBooking, setToggleBooking] = useState(null);
  const [showToggleBooking, setShowToggleBooking] = useState(false);
  const [searchParam] = useSearchParams();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const param = searchParam.entries();
    for (const [key, value] of param) {
      setBookingId(key);
    }
    if (bookingId) {
      const getUser = `http://127.0.0.1:8000/api/booking/${bookingId}`;

      axios
        .get(getUser, { headers })
        .then((response) => {
          const data = response.data.success.data;
          setBooking(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.response);
        });
    }
  }, [bookingId, searchParam]);

  const deleteBooking = (index) => {
    axios
      .delete(`http://127.0.0.1:8000/api/booking/delete/${index}`)
      .then((response) => {
        const del = response.data.success;
        setBookingDel(del);
        setBooking(null);
        setTimeout(() => {
          navigate("/admin/booking");
        }, 3000);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const cancelBooking = (index) => {
    axios
      .post(`http://127.0.0.1:8000/api/booking/cancel/${index}`)
      .then((response) => {
        const toggle = response.data.success;
        setToggleBooking(toggle);
        setShowToggleBooking(true);
        setTimeout(() => {
          setShowToggleBooking(false);
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
              <h3 className="mb-4 text-color">View Booking</h3>
              <span className="delSuccess">
                {bookingDel && bookingDel.message ? bookingDel.message : null}
              </span>
              {booking !== null && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Room No</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">No Of Guests</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Paymnet Status</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking !== null && (
                      <tr key={booking.id}>
                        <th className="py-3" scope="row">
                          1
                        </th>
                        <td className="py-3">{booking.room_id}</td>
                        <td className="py-3">{booking.start_date}</td>
                        <td className="py-3">{booking.end_date}</td>
                        <td className="py-3">{booking.number_of_guests}</td>
                        <td className="py-3">{booking.payment_status}</td>
                        <td className="py-3">{booking.total_amount}</td>
                        <td className="py-3">
                          {booking.created_at
                            ? booking.created_at.substring(0, 10)
                            : null}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`btn m-2 ${toggleBooking && toggleBooking.restore ? 'btn-outline-success' : 'btn-outline-info'}`}
                            onClick={() => cancelBooking(booking.id)}
                          >
                            {toggleBooking && toggleBooking.restore ? 'Restore' : 'Cancel'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-2"
                            onClick={() => deleteBooking(booking.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {showToggleBooking && (
                <>
                  <span className="cancelBooking">
                    {toggleBooking && toggleBooking.cancel
                      ? toggleBooking.cancel
                      : null}
                  </span>
                  <span className="restoreBooking">
                    {toggleBooking && toggleBooking.restore
                      ? toggleBooking.restore
                      : null}
                  </span>
                </>
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
