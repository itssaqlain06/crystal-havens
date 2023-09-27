import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import axios from "axios";

export default function UpdateHotel() {
  // Initialize state variables with existing data or empty strings
  const [hotel, setHotel] = useState({
    name: "",
    email: "",
    phone: "",
    starRating: "",
    country: "",
    state: "",
    city: "",
    checkInTime: "00:00:00",
    checkOutTime: "23:59:00",
    address: "",
    description: "",
  });
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  // View record
  const [hotelId, setHotelId] = useState(null);
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
          setError(error.message);
        });
    }
  }, [hotelId, searchParam]);

  const handleAddHotel = async () => {
    const fields = {
      ...hotel,
    };
    try {
      let response = await fetch(
        `http://127.0.0.1:8000/api/hotel/update/${hotelId}`,
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
        navigate('/admin/hotels');
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
                  <h3 className="mb-4 text-color">Update Hotel</h3>

                  {/* Name */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, name: e.target.value })
                      }
                      value={hotel.name}
                      type="text"
                      className="form-control"
                      id="floatingName"
                      placeholder="Godzilla Hotel"
                    />
                    <label htmlFor="floatingName">Name</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.name
                        ? errors.error.name
                        : null}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, email: e.target.value })
                      }
                      value={hotel.email}
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingEmail">Email address</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.email
                        ? errors.error.email
                        : null}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, phone: e.target.value })
                      }
                      value={hotel.phone}
                      type="tel"
                      className="form-control"
                      id="floatingPhone"
                      placeholder="Phone"
                    />
                    <label htmlFor="floatingPhone">Phone</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.phone
                        ? errors.error.phone
                        : null}
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, starRating: e.target.value })
                      }
                      value={hotel.starRating}
                      type="number"
                      className="form-control"
                      id="floatingStar"
                      placeholder="5"
                    />
                    <label htmlFor="floatingStar">Star Rating</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.starRating
                        ? errors.error.starRating
                        : null}
                    </span>
                  </div>

                  {/* Country */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, country: e.target.value })
                      }
                      value={hotel.country}
                      type="text"
                      className="form-control"
                      id="floatingCountry"
                      placeholder="Pakistan"
                    />
                    <label htmlFor="floatingCountry">Country</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.country
                        ? errors.error.country
                        : null}
                    </span>
                  </div>

                  {/* State */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, state: e.target.value })
                      }
                      value={hotel.state}
                      type="text"
                      className="form-control"
                      id="floatingState"
                      placeholder="Punjab"
                    />
                    <label htmlFor="floatingState">State</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.state
                        ? errors.error.state
                        : null}
                    </span>
                  </div>

                  {/* City */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, city: e.target.value })
                      }
                      value={hotel.city}
                      type="text"
                      className="form-control"
                      id="floatingCity"
                      placeholder="Okara"
                    />
                    <label htmlFor="floatingCity">City</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.city
                        ? errors.error.city
                        : null}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setHotel({ ...hotel, address: e.target.value })
                      }
                      value={hotel.address}
                      type="text"
                      className="form-control"
                      id="floatingAddress"
                      placeholder="Pakistan, Punjab, Okara"
                    />
                    <label htmlFor="floatingAddress">Address</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.address
                        ? errors.error.address
                        : null}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingDescription"
                      style={{ height: "65px" }}
                      onChange={(e) =>
                        setHotel({ ...hotel, description: e.target.value })
                      }
                      value={hotel.description}
                    ></textarea>
                    <label htmlFor="floatingDescription">Description</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.description
                        ? errors.error.description
                        : null}
                    </span>
                  </div>

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
