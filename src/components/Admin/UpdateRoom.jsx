import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import axios from "axios";

export default function UpdateRoom() {
  // Initialize state variables with existing data or empty strings
  const [room, setRoom] = useState({
    room_no: "",
    price: "",
    capacity: "",
    type: "",
    description: "",
  });
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  // View record
  const [roomId, setRoomId] = useState(null);
  const [error, setError] = useState(null);

  // Navigate
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();

  const tokenObj = JSON.parse(localStorage.getItem("token"));
  const token = tokenObj ? tokenObj.token : null;
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  useEffect(() => {
    const param = searchParam.entries();
    for (const [key, value] of param) {
      setRoomId(key);
    }
    if (roomId) {
      const getUser = `http://127.0.0.1:8000/api/room/${roomId}`;

      axios
        .get(getUser, { headers })
        .then((response) => {
          const data = response.data.success.data;
          setRoom(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [roomId, searchParam]);

  const handleAddHotel = async () => {
    const fields = {
      ...room,
    };
    try {
      let response = await fetch(
        `http://127.0.0.1:8000/api/room/update/${roomId}`,
        {
          method: "PUT",
          body: JSON.stringify(fields),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (response.ok) {
        let result = await response.json();
        setErrors({});
        navigate("/admin/room");
      } else {
        let failed = await response.json();
        setErrors(failed.errors || {});
        setSuccess("");
      }
    } catch (error) {
      console.log("Something went wrong" + error);
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
                  <h3 className="mb-4 text-color">Update Room</h3>

                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) =>
                        setRoom({ ...room, room_no: e.target.value })
                      }
                      value={room.room_no}
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
                      onChange={(e) =>
                        setRoom({ ...room, price: e.target.value })
                      }
                      value={room.price}
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
                      onChange={(e) =>
                        setRoom({ ...room, capacity: e.target.value })
                      }
                      value={room.capacity}
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
                      onChange={(e) =>
                        setRoom({ ...room, type: e.target.value })
                      }
                      value={room.type}
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
                      onChange={(e) =>
                        setRoom({ ...room, description: e.target.value })
                      }
                      value={room.description}
                    ></textarea>
                    <label htmlFor="floatingDescription">Description</label>
                    <span className="loginErrors">
                      {errors && errors.description ? errors.description : null}
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
