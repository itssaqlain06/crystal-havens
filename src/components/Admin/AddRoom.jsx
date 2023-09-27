import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function AddRoom() {
  const [room_no, setRoom_no] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleAddHotel = async () => {
    const hotel_id = 1;
    const fields = {
      room_no,
      price,
      capacity,
      type,
      description,
      hotel_id,
    };
    try {
      let response = await fetch("http://127.0.0.1:8000/api/room/store", {
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
        navigate("/admin/rooms");
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
                  <h3 className="mb-4 text-color">Add Room</h3>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setRoom_no(e.target.value)}
                      value={room_no}
                      type="number"
                      className="form-control"
                      id="floatingRoom_no"
                      placeholder="1"
                    />
                    <label htmlFor="floatingRoom_no">Room No</label>
                    <span className="loginErrors">
                      {errors && errors.room_no ? errors.room_no : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type="number"
                      className="form-control"
                      id="floatingPrice"
                      placeholder="1000"
                    />
                    <label htmlFor="floatingPrice">Price</label>
                    <span className="loginErrors">
                      {errors && errors.price ? errors.price : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setCapacity(e.target.value)}
                      value={capacity}
                      type="number"
                      className="form-control"
                      id="floatingCapacity"
                      placeholder="2"
                    />
                    <label htmlFor="floatingCapacity">Capacity</label>
                    <span className="loginErrors">
                      {errors && errors.capacity ? errors.capacity : null}
                    </span>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select p-2"
                      aria-label="Default select example"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      <option value="standard">Standard</option>
                      <option value="deluxe">Deluxe</option>
                      <option value="suite">Suite</option>
                    </select>
                    <span className="loginErrors">
                      {errors && errors.type ? errors.type : null}
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
                      {errors && errors.description ? errors.description : null}
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
