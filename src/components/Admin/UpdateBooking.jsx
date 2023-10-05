import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import axios from "axios";

export default function UpdateBooking() {
  // Initialize state variables with existing data or empty strings
  const [booking, setBooking] = useState({
    room_id: "",
    total_amount: "",
    number_of_guests: "",
    payment_status: "",
    start_date: "",
    end_date: "",
  });
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  // View record
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

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
      const getBooking = `http://127.0.0.1:8000/api/booking/${bookingId}`;

      axios
        .get(getBooking, { headers })
        .then((response) => {
          const data = response.data.success.data;
          setBooking(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [bookingId, searchParam]);

  const handleAddHotel = async () => {
    const fields = {
      ...booking,
    };
    try {
      let response = await fetch(
        `http://127.0.0.1:8000/api/booking/update/${bookingId}`,
        {
          method: "PUT",
          body: JSON.stringify(fields),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        let result = await response.json();
        setErrors({});
        console.log(result);
        navigate("/admin/booking");
      } else {
        let failed = await response.json();
        setErrors(failed.errors || {});
        setSuccess("");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-10">
              <div className="bg-light rounded h-100 p-4">
                <form>
                  <h3 className="mb-4 text-color">Update Booking</h3>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setBooking({ ...booking, room_id: e.target.value })
                      }
                      value={booking.room_id}
                      type="number"
                      className="form-control"
                      id="floatingRoom_no"
                      placeholder="1"
                    />
                    <label htmlFor="floatingRoom_no">Room No</label>
                    <span className="loginErrors">
                      {errors && errors.room_id ? errors.room_id : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setBooking({ ...booking, total_amount: e.target.value })
                      }
                      value={booking.total_amount}
                      type="number"
                      className="form-control"
                      id="floatingPrice"
                      placeholder="1000"
                    />
                    <label htmlFor="floatingPrice">Total Amount</label>
                    <span className="loginErrors">
                      {errors && errors.total_amount ? errors.total_amount : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setBooking({ ...booking, number_of_guests: e.target.value })
                      }
                      value={booking.number_of_guests}
                      type="number"
                      className="form-control"
                      id="floatingCapacity"
                      placeholder="2"
                    />
                    <label htmlFor="floatingCapacity">Number Of Guests</label>
                    <span className="loginErrors">
                      {errors && errors.number_of_guests ? errors.number_of_guests : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select p-2"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setBooking({ ...booking, payment_status: e.target.value })
                      }
                      value={booking.payment_status}
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      <option value="standard">Pending</option>
                      <option value="deluxe">Complete</option>
                    </select>
                    <span className="loginErrors">
                      {errors && errors.payment_status ? errors.payment_status : null}
                    </span>
                  </div>    
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setBooking({ ...booking, start_date: e.target.value })
                      }
                      value={booking.start_date}
                      type="date"
                      className="form-control"
                      id="floatingCapacity"
                      placeholder="2"
                    />
                    <label htmlFor="floatingCapacity">Start Date</label>
                    <span className="loginErrors">
                      {errors && errors.start_date ? errors.start_date : null}
                    </span>
                  </div>    
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setBooking({ ...booking, end_date: e.target.value })
                      }
                      value={booking.end_date}
                      type="date"
                      className="form-control"
                      id="floatingCapacity"
                      placeholder="2"
                    />
                    <label htmlFor="floatingCapacity">Start Date</label>
                    <span className="loginErrors">
                      {errors && errors.end_date ? errors.end_date : null}
                    </span>
                  </div>                         
                    <span className="loginErrors">{errors && errors.message ? errors.message : null}</span>
                    <span className="loginErrors">{errors.error && errors.error.end_date ? errors.error.end_date : null}</span>

                  {/* Update button */}
                  <div className="form-floating">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 px-5"
                      onClick={handleAddHotel}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
