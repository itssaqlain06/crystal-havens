import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function AddHotel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [star_rating, setStarRating] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [checkin_time, setCheckInTime] = useState("00:00:00");
  const [checkout_time, setCheckOutTime] = useState("23:59:00");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();


  const handleAddHotel = async () => { 
    const fields = {
      name,
      email,
      phone,
      star_rating,
      country,
      state,
      city,
      checkin_time,
      checkout_time,
      address,
      description
    };
    try {
      let response = await fetch("http://127.0.0.1:8000/api/hotel/store", {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.ok) {
        let result = await response.json();
        console.log(result.success);
        setErrors("");
        navigate('/admin/hotels');
      } else {
        let failed = await response.json();
        setErrors(failed.errors);
        console.log(failed.errors);
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
                  <h3 className="mb-4 text-color">Add Hotel</h3>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
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
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="tel"
                      className="form-control"
                      id="floatingPhone"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPhone">Phone</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.phone
                        ? errors.error.phone
                        : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setStarRating(e.target.value)}
                      value={star_rating}
                      type="number"
                      className="form-control"
                      id="floatingStar"
                      placeholder="5"
                    />
                    <label htmlFor="floatingStar">Star Rating</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.star_rating
                        ? errors.error.star_rating
                        : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
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
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setState(e.target.value)}
                      value={state}
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
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
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
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
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
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingDescription"
                      style={{ height: "65px" }}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                    <label htmlFor="floatingDescription">Description</label>
                    <span className="loginErrors">
                      {errors.error && errors.error.description
                        ? errors.error.description
                        : null}
                    </span>
                  </div>
                  <div className="form-floating">
                    <div
                      type="submit"
                      className="btn btn-primary mt-3 px-5"
                      onClick={() => handleAddHotel()}
                    >
                      Add
                    </div>
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
